import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../config/globals';
import {Observable} from 'rxjs';
import {BusStatus} from '../models/bus';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  constructor(
    private http: HttpClient,
    private globals: Globals) { }

  getAllBusStatusForCheckpointExit(): Observable<BusStatus[]> {
    return this.http.get<BusStatus[]>(this.globals.baseUrl + '/bus/log/exit');
  }
}
