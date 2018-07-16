import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../models/user';
import {Globals} from '../config/globals';
import {Observable} from 'rxjs';

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
    return this.http.post(this.globals.baseUrl + '/user', user);
  }

  update(user: User) {
    return this.http.put(this.globals.baseUrl + '/user', user);
  }
}
