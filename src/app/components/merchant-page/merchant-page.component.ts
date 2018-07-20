import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Globals} from '../../config/globals';
import {AuthenticationService} from '../../services/authentication.service';
import {User} from '../../models/user';
declare var $: any;

@Component({
  selector: 'app-merchant-page',
  templateUrl: './merchant-page.component.html',
  styleUrls: ['./merchant-page.component.css']
})
export class MerchantPageComponent implements OnInit, AfterViewInit {

  user: User;

  constructor(
    private globals: Globals,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const self = this;

    $('.ui.search')
      .search({
        type: 'category',
        minCharacters: 7,
        cache: false,
        error: true,
        apiSettings: {
          url: this.globals.baseUrl + '/user?username={query}',
          silent: true,
          beforeSend: function(settings) {
            if (!self.authenticationService.isLoggedIn()) {
              $(this).state('flash text', 'Requires Login!');
              return false;
            } else {
              return settings;
            }
          },
          beforeXHR: function(xhr) {
            xhr.setRequestHeader ('Authorization', 'Basic ' + self.authenticationService.getCurrentUserToken());
            return xhr;
          },
          onResponse: function(serverResponse) {
            const response = {
              results: {}
            };
            if (response.results['name'] === undefined) {
              response.results['name'] = {
                name    : 'Name',
                results : []
              };
            }

            let fullName = serverResponse.firstName;
            if (serverResponse.middleName) {
              fullName = fullName.concat(' ', serverResponse.middleName, ' ', serverResponse.lastName);
            } else {
              fullName = fullName.concat(' ', serverResponse.lastName);
            }

            response.results['name'].results.push({
              title: fullName,
              originalItem: serverResponse
            });
            return response;
          },
          onComplete: function(response, element, xhr) {

          },
          onFailure: function(response, element) {

          },
          onError: function(errorMessage, element, xhr) {

          },
          onAbort: function(errorMessage, element, xhr) {

          }
        },
        onSelect: function(result) {
          self.user = result.originalItem;
          $('.ui.search').search('hide results');
          return false;
        },
      });
  }

  get fullName(): string {
    if (!this.user) {
      return null;
    } else {
      if (!this.user.middleName) {
        return `${this.user.firstName} ${this.user.lastName}`;
      } else {
        return `${this.user.firstName} ${this.user.middleName} ${this.user.lastName}`;
      }
    }
  }
}
