import { ActivationEnd, Router, Params } from '@angular/router';
import { Component } from '@angular/core';
import { filter, map } from 'rxjs';

import { dashboardPath, authPath } from 'src/app/constants/routes';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent {
  isOpened: boolean = false;
  routeParams: Params = {};

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.router.events
      .pipe(
        filter(
          (e) =>
            e instanceof ActivationEnd &&
            Object.keys(e.snapshot.params).length > 0
        ),
        map((e) => (e instanceof ActivationEnd ? e.snapshot.params : {}))
      )
      .subscribe((params) => {
        this.routeParams = params;
      });
  }

  toggleAside() {
    this.isOpened = !this.isOpened;
  }

  onShare() {
    this.userService.user.subscribe((user) => {
      this.toggleAside();
      this.router.navigate([
        dashboardPath.dashboard,
        user!.uid,
        dashboardPath.share,
      ]);
    });
  }

  onLogout() {
    this.authService.logout().subscribe(() => {
      this.toggleAside();
      this.router.navigate([authPath.auth, authPath.login]);
    });
  }

  onToDo() {
    this.userService.user.subscribe((user) => {
      this.toggleAside();
      this.router.navigate([
        dashboardPath.dashboard,
        user!.uid,
        dashboardPath.todo,
      ]);
    });
  }

  onSharedWithMe() {
    this.userService.user.subscribe((user) => {
      this.toggleAside();
      this.router.navigate([
        dashboardPath.dashboard,
        user!.uid,
        dashboardPath.sharedWithMe,
      ]);
    });
  }
}
