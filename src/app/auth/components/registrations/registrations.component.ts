import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { dashboardPath } from 'src/app/constants/routes';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.scss'],
})
export class RegistrationsComponent {
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
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

    this.userService.register(this.registrationsForm.value).subscribe({
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
