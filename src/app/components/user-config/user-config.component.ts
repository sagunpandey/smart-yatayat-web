import {Component, Input, OnInit} from '@angular/core';
import {User, UserRfid} from '../../models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {validateEmail, validatePassword} from '../user-registration/registration-validator';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.css']
})
export class UserConfigComponent implements OnInit {

  infoFormGroup: FormGroup;
  emailFormGroup: FormGroup;
  passwordFormGroup: FormGroup;

  @Input() user: User;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    this.infoFormGroup = this.formBuilder.group({
      firstName: [null, Validators.required],
      middleName: [],
      lastName: [null, Validators.required],
      phone: []
    });

    this.emailFormGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      confirmEmail: [null, [Validators.required]]
    }, {
      validator: validateEmail
    });

    this.passwordFormGroup = this.formBuilder.group({
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    }, {
      validator: validatePassword
    });
  }

  get ifc() { return this.infoFormGroup.controls; }
  get efc() { return this.emailFormGroup.controls; }
  get pfc() { return this.passwordFormGroup.controls; }

  ngOnChanges(changes: any) {
    const user: any = changes.user;
    if (!!user.currentValue) {
      this.createForm(user.currentValue);
      this.infoFormGroup.patchValue(user.currentValue);
      this.emailFormGroup.patchValue(user.currentValue);
    }
  }

  createForm(user: User) {

  }

  onInfoUpdate() {
    if (this.infoFormGroup.invalid) {
      return;
    }

    Object.assign(this.user, this.infoFormGroup.value);
    this.updateUser();
  }

  onEmailUpdate() {
    if (this.infoFormGroup.invalid) {
      return;
    }

    Object.assign(this.user, this.emailFormGroup.value);
    this.updateUser();
  }

  onPasswordUpdate() {
    if (this.passwordFormGroup.invalid) {
      return;
    }

    this.user['password'] = this.passwordFormGroup.controls.password.value;
    this.updateUser();
  }

  updateUser() {
    this.userService.update(this.user)
      .subscribe((data) => {
        window.alert('Profile Updated');
      });
  }

  updateCard(card: UserRfid) {
    this.userService.updateCard(card)
      .subscribe((data) => {
        window.alert('Card Updated');
      });
  }
}
