import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['sag.pan@gmail.com', Validators.required],
      password: ['yatayat123', Validators.required]
    });

    this.authenticationService.logout();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .subscribe(
        (data) => {
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          console.log('Login Failed: ', error);
        }
      );
  }
}
