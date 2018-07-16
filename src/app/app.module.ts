import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserPageComponent } from './components/user-page/user-page.component';
import {AuthGuard} from './guards/auth.guard';
import {AuthenticationService} from './services/authentication.service';
import {UserService} from './services/user.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BasicAuthInterceptor} from './interceptors/basic-auth.interceptor';
import {LoginErrorInterceptor} from './interceptors/login-error.interceptor';
import {Globals} from './config/globals';
import { UserConfigComponent } from './components/user-config/user-config.component';
import { MerchantPageComponent } from './components/merchant-page/merchant-page.component';
import { BusStatusPageComponent } from './components/bus-status-page/bus-status-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    UserRegistrationComponent,
    UserPageComponent,
    UserConfigComponent,
    MerchantPageComponent,
    BusStatusPageComponent,
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
