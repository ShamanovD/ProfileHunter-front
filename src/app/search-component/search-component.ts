import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SourceType, SourceTypeMap} from '../model/source-type';
import {SearchModel} from '../model/search-model';

@Component({
  selector: 'app-search-component',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './search-component.html',
  styleUrl: './search-component.css'
})
export class SearchComponent implements OnInit {

  form!: FormGroup;
  sourceTypes: SourceType[] = Object.entries(SourceType).map(item => item[1]);

  readonly sourceTypeMap = SourceTypeMap;

  @Input() searchModel!: SearchModel;

  @Output() onSearchChange = new EventEmitter<SearchModel>();
  @Output() showExtendedSettings = new EventEmitter<void>();

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(this.searchModel.username, [Validators.required]),
      sourceType: new FormControl(SourceType.TELEGRAM, [Validators.required]),
    })
  }

  submitSearch() {
    this.onSearchChange.emit(this.form.value);
  }

  onShowExtendedSettings() {
    this.showExtendedSettings.emit();
  }

}
