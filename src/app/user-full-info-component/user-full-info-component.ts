import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserFullInfo} from '../model/user-full-info';

@Component({
  selector: 'app-user-full-info-component',
  imports: [],
  templateUrl: './user-full-info-component.html',
  styleUrl: './user-full-info-component.css'
})
export class UserFullInfoComponent {

  @Input() userFullInfo!: UserFullInfo;
  @Output() onIconClose: EventEmitter<void> = new EventEmitter();

  onClose() {
    this.onIconClose.emit();
  }
}
