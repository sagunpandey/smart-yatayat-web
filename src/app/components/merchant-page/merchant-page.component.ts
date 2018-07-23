import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Globals} from '../../config/globals';
import {AuthenticationService} from '../../services/authentication.service';
import {Rfid, User, UserRfid} from '../../models/user';
import {UserService} from '../../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-merchant-page',
  templateUrl: './merchant-page.component.html',
  styleUrls: ['./merchant-page.component.css']
})
export class MerchantPageComponent implements OnInit, AfterViewInit {

  user: User;

  cardModalTitle = 'ADD/UPDATE CARD';
  cardToEdit: UserRfid;
  cardForm: FormGroup;

  constructor(
    private globals: Globals,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    const self = this;
    $('.ui.modal')
      .modal({
        closable: true,
        onDeny    : function() {
          return true;
        },
        onApprove : function() {
          if (self.cardToEdit) {
            self.cardToEdit.rfid = self.cardForm.value;

            self.updateCard(self.cardToEdit);
          } else {
            const user = new User();
            user.userInfoId = self.user.userInfoId;

            const userRfid =  new UserRfid();
            userRfid['userInfo'] = user;
            userRfid.rfid = self.cardForm.value;

            self.addCard(userRfid);
            return false;
          }
        }
      });

    this.cardForm = this.formBuilder.group({
      tag0: [null, Validators.required],
      tag1: [null, Validators.required],
      tag2: [null, Validators.required],
      tag3: [null, Validators.required],
      pin: [null, Validators.required]
    });
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

  onAddCardClicked() {
    this.cardToEdit = null;
    this.openCardModal();
  }

  onEditCardClicked(card: UserRfid) {
    this.cardToEdit = card;
    this.cardForm.patchValue(card.rfid);
    this.openCardModal();
  }

  openCardModal() {
    if (this.user) {
      $('.ui.modal').modal('show');
    }
  }

  onBalanceUpdate(balance: any) {
    if (this.user) {
      const newBalance = Number(balance);
      const oldBalance = Number(this.user.balance);

      this.user.balance = oldBalance + newBalance;

      this.userService.update(this.user)
        .subscribe((data) => {
          window.alert('User balance updated');
          Object.assign(data);
        });
    }
  }

  onDeactivateCard(card: UserRfid) {
    if (card.active = 0) {
      card.active = 1;
    } else if (card.active = 1) {
      card.active = 0;
    }

    this.updateCard(card);
  }

  updateCard(card: UserRfid) {
    this.userService.updateCard(card)
      .subscribe((data) => {
        window.alert('Card Updated');
        this.clearCardToEdit();
        $('.ui.modal').modal('hide');
      }, (error) => {
        this.clearCardToEdit();
      });
  }

  addCard(card: UserRfid) {
    this.userService.addCard(card)
      .subscribe((data) => {
        window.alert('Card Added');
      });
  }

  clearCardToEdit() {
    if (this.cardToEdit) {
      this.cardToEdit = null;
    }
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
