import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {UserInfo} from '../model/user-info';
import cytoscape, {StylesheetStyle} from 'cytoscape';
import {layout} from '../model/graph-layout';
import {style} from '../model/graph-style';

@Component({
  selector: 'app-graph-component',
  imports: [],
  templateUrl: './graph-component.html',
  styleUrl: './graph-component.css'
})
export class GraphComponent implements AfterViewInit, OnChanges {

  @ViewChild('cy') cyContainer!: ElementRef; // Используем ViewChild для получения ссылки на элемент

  cytoscapeInstance!: cytoscape.Core; // Переименуем для ясности

  @Input() linkedUsers!: UserInfo[];
  @Input() currentUser!: UserInfo;

  @Output() onDoubleClick = new EventEmitter<UserInfo>();

  // Отслеживаем изменения входных свойств
  ngOnChanges(changes: SimpleChanges): void {
    // Проверяем, изменились ли currentUser или linkedUsers
    if (changes['currentUser'] || changes['linkedUsers']) {
      // Убедимся, что currentUser и linkedUsers существуют и не пусты
      // И что элемент Cytoscape контейнер уже доступен
      if (this.currentUser?.username && this.cyContainer) {
        // Только если данные присутствуют, вызываем обновление графа
        this.updateGraph();
      }
    }
  }

  ngAfterViewInit(): void {
    if (this.currentUser?.username) {
      this.initCytoscape();
    }
  }

  private initCytoscape(): void {
    // Уничтожаем старый экземпляр, если он есть, перед созданием нового
    if (this.cytoscapeInstance) {
      this.cytoscapeInstance.destroy();
    }

    // Если контейнер еще не доступен, выходим
    if (!this.cyContainer?.nativeElement) {
      console.warn('Cytoscape container not found.');
      return;
    }

    console.log('Инициализация Cytoscape с текущим пользователем:', this.currentUser);

    this.cytoscapeInstance = cytoscape({
      container: this.cyContainer.nativeElement, // Используем ElementRef
      // Другие настройки Cytoscape
      elements: this.buildGraphElements(), // Выносим логику построения элементов в отдельный метод
      style: style as StylesheetStyle[],
      layout: layout,
    });

    // Опционально: Добавьте обработчики событий Cytoscape здесь
    this.cytoscapeInstance.on('dblclick', 'node', (evt) => {
      const node = evt.target;
      console.log('clicked dblclick');
      console.log(node.data());

      this.onDoubleClick.emit(node.data());
    });
  }

  private updateGraph(): void {
    // Если Cytoscape еще не инициализирован, инициализируем его
    if (!this.cytoscapeInstance) {
      this.initCytoscape();
      return;
    }

    // Очищаем существующие элементы
    this.cytoscapeInstance.elements().remove();

    // Добавляем новые элементы
    const newElements = this.buildGraphElements();
    this.cytoscapeInstance.add(newElements);

    // Применяем макет, чтобы узлы перераспределились
    this.cytoscapeInstance.layout({
      name: 'cose', // Или любой другой макет, который вы предпочитаете
      animate: true, // Анимировать перераспределение
      fit: true,
      padding: 50,
      nodeDimensionsIncludeLabels: true
    }).run();

    console.log('Граф обновлен с текущим пользователем:', this.currentUser);
  }

  private buildGraphElements(): any[] {
    const elements: any[] = [];

    // Добавляем центральный узел (currentUser)
    if (this.currentUser?.username) {
      elements.push({
        data: {
          id: this.currentUser.id, // Используем ID или username как ID узла
          username: this.currentUser.username,
          fullName: `${this.currentUser.firstName || ''} ${this.currentUser.lastName || ''}`.trim(),
          sourceType: this.currentUser.sourceType,
          image: this.currentUser.image,
          description: this.currentUser.description
        },
        classes: 'center-node', // Добавляем класс для стилизации центрального узла
        position: { x: 0, y: 0 } // Можно оставить эту позицию, но макет ее все равно переопределит
      });
    } else {
      console.warn('currentUser не определен или не имеет username.');
    }

    // Добавляем linkedUsers и связи с currentUser
    if (this.linkedUsers && this.linkedUsers.length > 0 && this.currentUser?.username) {
      const currentUserNodeId = this.currentUser.id || this.currentUser.username;
      this.linkedUsers.forEach(user => {
        const linkedUserNodeId = user.id || user.username;
        if (linkedUserNodeId !== currentUserNodeId) { // Избегаем добавления центрального узла дважды
          elements.push({
            data: {
              id: linkedUserNodeId,
              username: user.username,
              fullName: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
              sourceType: user.sourceType,
              image: user.image,
              description: user.description
            },
            // position: { x: ..., y: ... } // Позиции будут заданы макетом
          });

          // Добавляем ребро от центрального пользователя к связанному
          elements.push({
            data: {
              id: `edge_${currentUserNodeId}_${linkedUserNodeId}`, // Уникальный ID для ребра
              source: currentUserNodeId,
              target: linkedUserNodeId
            }
          });
        }
      });
    }

    return elements;
  }

  ngOnDestroy(): void {
    // Обязательно уничтожайте экземпляр Cytoscape, когда компонент разрушается
    if (this.cytoscapeInstance) {
      this.cytoscapeInstance.destroy();
    }
  }


}
