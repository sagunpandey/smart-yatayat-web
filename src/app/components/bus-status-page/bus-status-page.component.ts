import { Component, OnInit } from '@angular/core';
import {BusService} from '../../services/bus.service';
import {BusStatus} from '../../models/bus';

@Component({
  selector: 'app-bus-status-page',
  templateUrl: './bus-status-page.component.html',
  styleUrls: ['./bus-status-page.component.css']
})
export class BusStatusPageComponent implements OnInit {

  busStatuses: BusStatus[];

  constructor(private busService: BusService) { }

  ngOnInit() {
    this.getBusStatus();
  }

  getBusStatus() {
    this.busService.getAllBusStatusForCheckpointExit()
      .subscribe((data) => {
        this.busStatuses = data;
      });
  }
}
