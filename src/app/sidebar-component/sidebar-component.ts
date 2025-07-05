import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserInfo} from '../model/user-info';
import { SourceTypeMap } from '../model/source-type';

@Component({
  selector: 'app-sidebar-component',
  imports: [],
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.css'
})
export class SidebarComponent {

  @Input() linkedUsers !: UserInfo[];
  @Input() currentUser !: UserInfo;

  readonly SourceTypeMap = SourceTypeMap;

  @Output() onClick = new EventEmitter<UserInfo>();

  onUserClick(currentUser: UserInfo) {
    this.onClick.emit(currentUser);
  }
}
