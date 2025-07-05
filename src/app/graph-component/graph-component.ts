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

  @ViewChild('cy') cyContainer!: ElementRef;

  cytoscapeInstance!: cytoscape.Core;

  @Input() linkedUsers!: UserInfo[];
  @Input() currentUser!: UserInfo;

  @Output() onDoubleClick = new EventEmitter<UserInfo>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentUser'] || changes['linkedUsers']) {
      if (this.currentUser?.username && this.cyContainer) {
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
    if (this.cytoscapeInstance) {
      this.cytoscapeInstance.destroy();
    }

    if (!this.cyContainer?.nativeElement) {
      console.warn('Cytoscape container not found.');
      return;
    }

    console.log('Инициализация Cytoscape с текущим пользователем:', this.currentUser);

    this.cytoscapeInstance = cytoscape({
      container: this.cyContainer.nativeElement,

      elements: this.buildGraphElements(),
      style: style,
      layout: layout,
    });

    this.cytoscapeInstance.on('dblclick', 'node', (evt) => {
      const node = evt.target;
      console.log('clicked dblclick');
      console.log(node.data());

      this.onDoubleClick.emit(node.data());
    });
  }

  private updateGraph(): void {
    if (!this.cytoscapeInstance) {
      this.initCytoscape();
      return;
    }

    this.cytoscapeInstance.elements().remove();

    const newElements = this.buildGraphElements();
    this.cytoscapeInstance.add(newElements);

    this.cytoscapeInstance.layout(layout).run();

    console.log('Graph updated:', this.currentUser);
  }

  private buildGraphElements(): any[] {
    const elements: any[] = [];

    if (this.currentUser?.username) {
      elements.push({
        data: {
          id: this.currentUser.id,
          username: this.currentUser.username,
          fullName: `${this.currentUser.firstName || ''} ${this.currentUser.lastName || ''}`.trim(),
          sourceType: this.currentUser.sourceType,
          image: this.currentUser.image,
          description: this.currentUser.description
        },
        classes: 'center-node',
        position: { x: 0, y: 0 }
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
          });

          elements.push({
            data: {
              id: `edge_${currentUserNodeId}_${linkedUserNodeId}`,
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
