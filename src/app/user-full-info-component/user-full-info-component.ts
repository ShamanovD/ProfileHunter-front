import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserFullInfo} from '../model/user-full-info';
import {KeyValuePipe} from '@angular/common';
import {SearchService} from '../services/search-service';

@Component({
  selector: 'app-user-full-info-component',
  imports: [
    KeyValuePipe
  ],
  templateUrl: './user-full-info-component.html',
  styleUrl: './user-full-info-component.css'
})
export class UserFullInfoComponent implements OnInit {
  @Input() userFullInfo!: UserFullInfo;
  @Output() onIconClose: EventEmitter<void> = new EventEmitter();

  currentPhoto!: string;
  fieldDictionary!: { [key: string]: any };

  constructor(private readonly searchService: SearchService) {}

  ngOnInit(): void {
    if (this.userFullInfo.profilePhotos.length > 0) {
      this.currentPhoto = this.userFullInfo.profilePhotos[0];
    }

    this.fieldDictionary = this.searchService.fieldDictionary;
  }

  onClose() {
    this.onIconClose.emit();
  }

}
