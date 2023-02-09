import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { dashboardPath } from 'src/app/constants/routes';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
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
    this.authService.login(this.loginForm.value).subscribe({
      next: (user) => {
        this.isSubmitting = false;

        this.router.navigate([
          dashboardPath.dashboard,
          user.id,
          dashboardPath.todo,
        ]);
      },
      error: () => (this.isSubmitting = false),
    });
  }
}
