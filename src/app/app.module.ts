import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserPageComponent } from './user-page/user-page.component';
import {AuthGuard} from './guards/auth.guard';
import {AuthenticationService} from './services/authentication.service';
import {UserService} from './services/user.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BasicAuthInterceptor} from './interceptors/basic-auth.interceptor';
import {LoginErrorInterceptor} from './interceptors/login-error.interceptor';
import {Globals} from './config/globals';

@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    UserRegistrationComponent,
    UserPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    {provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoginErrorInterceptor, multi: true},
    Globals
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
