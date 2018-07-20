import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Token} from '../models/token';
import {Globals} from '../config/globals';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private globals: Globals) { }

  login(username: string, password: string) {
    return this.http.post(this.globals.baseUrl + '/user/login', { username: username, password: password })
      .pipe(map((data: Token) => {
        localStorage.setItem('token', data['token']);
        localStorage.setItem('currentUser', data['username']);
        return data['token'];
      }));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }

  isLoggedIn() {
    return !!(this.getCurrentUserToken() && this.getCurrentUserName());
  }

  getCurrentUserName() {
    return localStorage.getItem('currentUser');
  }

  getCurrentUserToken() {
    return localStorage.getItem('token');
  }
}
