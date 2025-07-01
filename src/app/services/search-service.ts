import { Injectable } from '@angular/core';
import {SearchModel} from '../model/search-model';
import {Observable} from 'rxjs';
import {UserInfo} from '../model/user-info';
import {HttpClient, HttpParams} from '@angular/common/http';
import {UserFullInfo} from '../model/user-full-info';

@Injectable({
  providedIn: 'root',
})
export class SearchService {

  private readonly apiUrl = 'http://localhost:8080/'; // Базовый URL твоего бэкенда

  constructor(private readonly http: HttpClient) { }

  searchStartNode(item: SearchModel): Observable<UserInfo> {
    let params = new HttpParams()
      .set('username', item.username)
      .set('type', item.sourceType.toUpperCase());

    return this.http.get<UserInfo>(`${this.apiUrl}search/start`, {
      params: params
    })
  }

  searchLinkedNodes(item: SearchModel): Observable<UserInfo[]> {
    let params = {
      username: item.username,
    }

    return this.http.post<UserInfo[]>(`${this.apiUrl}search/linked`, item.linkedSearchFilter, {
      params: params
    })
  }

  getFullUserInfo(item: SearchModel): Observable<UserFullInfo> {
    let params = {
      username: item.username,
      type: item.sourceType
    }

    return this.http.get<UserFullInfo>(`${this.apiUrl}search/info/full`, {
      params: params
    })
  }

}
