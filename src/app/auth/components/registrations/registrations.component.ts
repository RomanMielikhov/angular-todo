import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.scss'],
})
export class RegistrationsComponent {
  constructor(private formBuilder: FormBuilder) {}

  loginForm: FormGroup = this.formBuilder.group({
    password: ['', Validators.minLength(4)],
    email: ['', Validators.email],
    name: [''],
  });
}
