import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>('');
  }

  getById(id: number) {
    return this.http.get('');
  }

  register(user: User) {
    return this.http.post('', user);
  }

  update(user: User) {
    return this.http.put('', user);
  }

  delete(id: number) {
    return this.http.delete('');
  }
}
