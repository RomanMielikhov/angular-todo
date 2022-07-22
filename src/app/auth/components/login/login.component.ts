import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from 'src/app/auth/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  isSubmitting: boolean = false;

  loginForm: FormGroup = this.formBuilder.group({
    password: ['123123', [Validators.required, Validators.minLength(6)]],
    email: [
      'roman.mielikhov@avenga.com',
      [Validators.required, Validators.email],
    ],
  });

  async onSubmit() {
    this.isSubmitting = true;
    await this.authService.login(this.loginForm.value);
    this.isSubmitting = false;
  }
}
