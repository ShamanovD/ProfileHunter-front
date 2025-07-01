import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GraphComponent} from '../graph-component/graph-component';
import {SidebarComponent} from '../sidebar-component/sidebar-component';
import {UserInfo} from '../model/user-info';
import {SearchModel} from '../model/search-model';
import {SearchType} from '../model/search-type';

@Component({
  selector: 'app-graph-view-component',
  imports: [
    GraphComponent,
    SidebarComponent
  ],
  templateUrl: './graph-view-component.html',
  styleUrl: './graph-view-component.css'
})
export class GraphViewComponent {

  @Input() linkedUsers !: UserInfo[];
  @Input() currentUser !: UserInfo;

  @Output() handleOnUserClick = new EventEmitter<SearchModel>();

  onUserClick($event: UserInfo) {
    let searchModel = {
      username: $event.username,
      sourceType: $event.sourceType,
      linkedSearchFilter: {
        searchType: SearchType.QUICK,
        sourceTypes: [],
        startNodeType: $event.sourceType
      }
    }

    this.handleOnUserClick.emit(searchModel)
  }
}
