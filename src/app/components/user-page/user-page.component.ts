import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  selectedTab = 1;

  user: User;

  onTabSelect(tabIndex: number): void {
    this.selectedTab = tabIndex;
  }

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getByUsername(this.authenticationService.getCurrentUserName())
      .subscribe((data) => {
        this.user = data;
      });
  }
}
