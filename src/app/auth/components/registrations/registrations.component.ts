import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { dashboardPath } from 'src/app/constants/routes';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.scss'],
})
export class RegistrationsComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,

    private readonly http: HttpClient
  ) {}

  isSubmitting: boolean = false;

  registrationsForm: FormGroup = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]],
  });

  async onSubmit() {
    this.isSubmitting = true;

    this.authService.register(this.registrationsForm.value).subscribe({
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
