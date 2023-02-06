import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { dashboardPath } from 'src/app/constants/routes';

import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { MessageService } from 'src/app/shared/services/message/message.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private snackbarService: SnackbarService,
    private messageService: MessageService,
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
    // this.authService.login(this.loginForm.value).subscribe(
    //   (data) => {
    //     this.isSubmitting = false;
    //     this.router.navigate([
    //       dashboardPath.dashboard,
    //       data.user.uid,
    //       dashboardPath.todo,
    //     ]);
    //   },
    //   (error) => {
    //     this.isSubmitting = false;
    //     if (error instanceof FirebaseError) {
    //       this.snackbarService.warn(
    //         this.messageService.getMessageByFirebaseCode(error.code)
    //       );
    //     }
    //   }
    // );
  }
}
