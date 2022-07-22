import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
// import { MatButtonModule } from '@angular/material/button';

import { ButtonModule } from '../shared/components/button/button.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/login/login.component';
import { FieldModule } from '../shared/components/field/field.module';
import { RegistrationsComponent } from './components/registrations/registrations.component';

@NgModule({
  declarations: [LoginComponent, RegistrationsComponent, AuthComponent],
  imports: [
    FieldModule,
    CommonModule,
    MatCardModule,
    MatTabsModule,
    ButtonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
