import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User, UserRfid} from '../models/user';
import {Globals} from '../config/globals';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private globals: Globals) { }

  getByUsername(username: string): Observable<any> {
    const httpParams = new HttpParams()
      .set('username', username);

    return this.http.get(this.globals.baseUrl + '/user', {params: httpParams});
  }

  register(user: User) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post(this.globals.baseUrl + '/user/create', user, {headers: headers})
      .pipe(map(
        (data: User) => {
          return data;
        }
      ));
  }

  update(user: User) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return this.http.put(this.globals.baseUrl + '/user/update', user, {headers: headers})
      .pipe(map(
        (data: User) => {
          return data;
        }
      ));
  }

  addCard(card: UserRfid) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post(this.globals.baseUrl + '/user/card/create', card, {headers: headers})
      .pipe(map(
        (data: UserRfid) => {
          return data;
        }
      ));
  }

  updateCard(card: UserRfid) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return this.http.put(this.globals.baseUrl + '/user/card/update', card, {headers: headers})
      .pipe(map(
        (data: UserRfid) => {
          return data;
        }
      ));
  }
}
