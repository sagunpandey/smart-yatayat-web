import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  selectedTab = 1;

  onTabSelect(tabIndex: number): void {
    this.selectedTab = tabIndex;
  }

  constructor() { }

  ngOnInit() {
  }

}
