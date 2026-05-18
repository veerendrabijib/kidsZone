import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { SignupComponent } from './auth/signup/signup.component';

export const routes: Routes = [
  // Default redirect to login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Auth routes
  { path: 'login',           component: LoginComponent          },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'signup',          component: SignupComponent          },

  // Fallback
  { path: '**', redirectTo: 'login' }
];
