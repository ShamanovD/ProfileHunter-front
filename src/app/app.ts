import {Component, ViewEncapsulation} from '@angular/core';
import {SearchModel} from './model/search-model';
import {UserInfo} from './model/user-info';
import {SearchService} from './services/search-service';
import {GraphViewComponent} from './graph-view-component/graph-view-component';
import {Subscription} from 'rxjs';
import {SearchComponent} from './search-component/search-component';
import {ExtendedSearchComponent} from './extended-search-component/extended-search-component';
import {LinkedSearchFilter} from './model/linked-search-filter';
import {SourceType} from './model/source-type';
import {SearchType} from './model/search-type';
import {UserFullInfoComponent} from './user-full-info-component/user-full-info-component';
import {UserFullInfo} from './model/user-full-info';

@Component({
  selector: 'app-root',
  imports: [GraphViewComponent, SearchComponent, ExtendedSearchComponent, UserFullInfoComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  encapsulation: ViewEncapsulation.None
})
export class App {

  protected centerUser!: UserInfo;
  protected linkedUsers!: UserInfo[];
  protected userFullInfo!: UserFullInfo;

  protected isUserLoaded = false;
  protected showExtendedSettings = false;
  protected isShowFullInfo: boolean = false;

  protected searchModelFilter: SearchModel = {
    username: '',
    sourceType: SourceType.TELEGRAM,
    linkedSearchFilter: {
      startNodeType: SourceType.TELEGRAM,
      sourceTypes: [SourceType.TELEGRAM, SourceType.INSTAGRAM, SourceType.TWITTER, SourceType.YOUTUBE],
      searchType: SearchType.QUICK
    }
  }

  private searchSubscription: Subscription | undefined;
  private linkedSearchSubscription: Subscription | undefined; // Новая подписка для связанного поиска
  private userFullInfoSubscription: Subscription | undefined;

  constructor(private readonly searchService: SearchService) {
  }

  handleSearchRequest($event: SearchModel) {
    this.isUserLoaded = false;
    this.linkedUsers = [];

    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
    if (this.linkedSearchSubscription) {
      this.linkedSearchSubscription.unsubscribe();
    }
    if (this.userFullInfoSubscription) {
      this.userFullInfoSubscription.unsubscribe();
    }

    this.searchSubscription = this.searchService.searchStartNode($event).subscribe(search => {
      this.centerUser = search;
      this.isUserLoaded = true;
      this.searchModelFilter.username = $event.username;
      this.searchModelFilter.sourceType = $event.sourceType;
      this.searchModelFilter.linkedSearchFilter.startNodeType = $event.sourceType;

      this.linkedSearchSubscription = this.searchService.searchLinkedNodes(this.searchModelFilter)
        .subscribe({
          next: (linkedAccountsData) => {
            console.log('Связанные аккаунты получены:', linkedAccountsData);
            this.linkedUsers = linkedAccountsData; // Обновляем список связанных аккаунтов
          },
          error: (linkedSearchError) => {
            console.error('Ошибка при поиске связанных аккаунтов:', linkedSearchError);
            alert('Ошибка при загрузке связанных аккаунтов: ' + (linkedSearchError.error?.message ?? linkedSearchError.message));
          }
        });
    });
  }

  onSettingsApplied(filter: LinkedSearchFilter): void {
    console.log(filter);

    this.searchModelFilter.linkedSearchFilter = filter;
    this.showExtendedSettings = false;
  }

  onShowExtendedSettingsPopup(): void {
    this.showExtendedSettings = true;
  }

  onCloseExtendedSettingsPopup() {
    this.showExtendedSettings = false;
  }

  onUserFullInfoClick($event: SearchModel) {
    if (this.userFullInfoSubscription) {
      this.userFullInfoSubscription.unsubscribe();
    }

    this.userFullInfoSubscription = this.searchService.getFullUserInfo($event)
      .subscribe(fullInfo => {
      this.userFullInfo = fullInfo;
      this.isShowFullInfo = true;
    })
  }
}
