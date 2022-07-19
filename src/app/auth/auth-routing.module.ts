import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { authPath } from '../constants/routes';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationsComponent } from './components/registrations/registrations.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: authPath.login,
        component: LoginComponent,
      },
      {
        path: authPath.registrations,
        component: RegistrationsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
