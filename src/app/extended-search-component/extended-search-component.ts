import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {LinkedSearchFilter} from '../model/linked-search-filter';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SourceType, SourceTypeMap} from '../model/source-type';
import {SearchType} from '../model/search-type';

@Component({
  selector: 'app-extended-search-component',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './extended-search-component.html',
  styleUrl: './extended-search-component.css',
  encapsulation: ViewEncapsulation.None
})
export class ExtendedSearchComponent implements OnInit {

  form!: FormGroup;
  sourceTypes: SourceType[] = Object.entries(SourceType).map(item => item[1]);
  searchTypes: string[] = Object.values(SearchType);

  readonly sourceTypeMap = SourceTypeMap;

  @Input() linkedSearchFilter!: LinkedSearchFilter;

  @Output() settingsApplied = new EventEmitter<LinkedSearchFilter>();
  @Output() closeSettings = new EventEmitter<void>();

  ngOnInit(): void {
    this.form = new FormGroup({
      searchType: new FormControl(this.linkedSearchFilter.searchType, [Validators.required]),
      sourceTypes: new FormControl(this.linkedSearchFilter.sourceTypes, [Validators.required])
    })
  }

  private updateCheckboxSelection(event: Event, controlName: string): void {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;
    const currentArray = this.form.get(controlName)?.value as string[] || [];

    if (checkbox.checked) {
      if (!currentArray.includes(value)) {
        this.form.get(controlName)?.setValue([...currentArray, value]);
      }
    } else {
      this.form.get(controlName)?.setValue(currentArray.filter(item => item !== value));
    }
  }

  onPlatformChange($event: Event) {
    this.updateCheckboxSelection($event, 'sourceTypes')
  }

  onSubmit() {
    if (this.form.valid) {
      this.settingsApplied.emit(this.form.value);
    }
  }

  onClose() {
    this.closeSettings.emit();
  }
}
