import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserCredential } from '@angular/fire/auth';
import { AuthService } from 'src/app/auth/services/auth.service';
import { dashboardPath } from 'src/app/constants/routes';
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
    const data = await this.authService.login(this.loginForm.value);
    this.isSubmitting = false;
    if (data) {
      this.router.navigate([dashboardPath.dashboard, data.user.uid]);
    }
  }

  logout() {
    this.authService.logout();
  }
}
