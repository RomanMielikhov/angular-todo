import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FieldModule } from '../shared/modules/field/field.module';
import { LoginComponent } from './components/login/login.component';
import { RegistrationsComponent } from './components/registrations/registrations.component';

@NgModule({
  declarations: [LoginComponent, RegistrationsComponent],
  imports: [CommonModule, AuthRoutingModule, FieldModule],
})
export class AuthModule {}
