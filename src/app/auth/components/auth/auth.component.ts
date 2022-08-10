import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { authPath } from '../../../constants/routes';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(private router: Router) {}

  links: string[] = [authPath.login, authPath.registrations];
  active: string = authPath.login;

  ngOnInit(): void {
    this.router.navigate([authPath.auth, authPath.login]);
  }

  setActive(link: string): void {
    this.active = link;
  }
}
