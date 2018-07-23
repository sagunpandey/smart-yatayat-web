import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {validateEmail, validatePassword} from './registration-validator';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      middleName: [],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      confirmEmail: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
      phone: [],
    }, {
      validator: [validateEmail, validatePassword]
    });
  }

  get f() { return this.registrationForm.controls; }

  onSubmit() {
    if (this.registrationForm.invalid) {
      return;
    }

    this.userService.register(this.registrationForm.value)
      .subscribe(
        (data) => {
          window.alert('Registration Successful');
          this.router.navigate(['/']);
        },
        (error) => {
          window.alert('Registration Failed');
        }
      );
  }
}
