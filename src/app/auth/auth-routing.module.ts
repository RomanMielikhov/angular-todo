import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { authPath } from '../constants/routes';
import { LoginComponent } from './components/login/login.component';
import { RegistrationsComponent } from './components/registrations/registrations.component';

const routes: Routes = [
  {
    path: authPath.login,
    component: LoginComponent,
  },
  {
    path: authPath.register,
    component: RegistrationsComponent,
  },
  { path: '', redirectTo: authPath.login, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
