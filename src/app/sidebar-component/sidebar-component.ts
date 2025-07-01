import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserInfo} from '../model/user-info';

@Component({
  selector: 'app-sidebar-component',
  imports: [],
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.css'
})
export class SidebarComponent {

  @Input() linkedUsers !: UserInfo[];
  @Input() currentUser !: UserInfo;

  @Output() onClick = new EventEmitter<UserInfo>();

  onUserClick(currentUser: UserInfo) {
    console.log('clicked onUserClick');
    console.log(currentUser);

    this.onClick.emit(currentUser);
  }
}
