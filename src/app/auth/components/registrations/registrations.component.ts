import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';

import { dashboardPath } from 'src/app/constants/routes';

import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { MessageService } from 'src/app/shared/services/message/message.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.scss'],
})
export class RegistrationsComponent {
  constructor(
    private snackbarService: SnackbarService,
    private messageService: MessageService,
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

    // from(this.authService.register(this.registrationsForm.value)).subscribe(
    //   (data) => {
    //     this.isSubmitting = false;

    //     this.router.navigate([
    //       dashboardPath.dashboard,
    //       data.user.uid,
    //       dashboardPath.todo,
    //     ]);
    //   },
    //   (error) => {
    //     if (error instanceof FirebaseError) {
    //       this.snackbarService.warn(
    //         this.messageService.getMessageByFirebaseCode(error.code)
    //       );
    //     }
    //   }
    // );
  }
}
