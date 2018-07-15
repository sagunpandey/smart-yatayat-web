import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginScreenComponent} from './login-screen/login-screen.component';
import {UserRegistrationComponent} from './user-registration/user-registration.component';
import {UserPageComponent} from './user-page/user-page.component';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginScreenComponent },
  { path: 'register', component: UserRegistrationComponent },
  { path: '', component: UserPageComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
