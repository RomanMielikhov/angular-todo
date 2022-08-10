import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { authPath } from 'src/app/constants/routes';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.scss'],
})
export class RegistrationsComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  isSubmitting: boolean = false;

  registrationsForm: FormGroup = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]],
  });

  async onSubmit() {
    this.isSubmitting = true;
    const res = await this.authService.register(this.registrationsForm.value);
    this.isSubmitting = false;

    if (res) {
      this.router.navigate([authPath.auth, authPath.login]);
    }
  }
}
