import {Component, Input, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {User} from '../../models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.infoFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      phone: ['']
    });

    this.emailFormGroup = this.formBuilder.group({
      email: ['', Validators.required],
      confirmEmail: ['', Validators.required]
    });

    this.passwordFormGroup = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnChanges(changes: any) {
    const user: any = changes.user;
    if (!!user.currentValue) {
      this.infoFormGroup.patchValue(user.currentValue);
      this.emailFormGroup.patchValue(user.currentValue);
    }
  }

  onInfoUpdate() {

  }

  onEmailUpdate() {

  }

  onPasswordUpdate() {

  }
}
