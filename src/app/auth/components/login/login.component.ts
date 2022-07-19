import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  loginForm: FormGroup = this.formBuilder.group({
    password: ['', Validators.minLength(4)],
    email: ['', Validators.email],
  });

  ngOnInit() {
    // console.log(this.loginForm);
  }
}
