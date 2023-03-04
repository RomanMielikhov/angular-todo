import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Subject, takeUntil } from 'rxjs';

import { dashboardPath } from 'src/app/constants/routes';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { UserService } from 'src/app/shared/services/user/user.service';
@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnDestroy, OnInit {
  isOpened: boolean = false;

  user: IUser | null = null;

  subscription$ = new Subscription();
  destroy$ = new Subject();

  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.subscription$ = this.userService
      .getUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => (this.user = user));
  }

  public toggleAside(): void {
    this.isOpened = !this.isOpened;
  }

  public onShare(): void {
    this.toggleAside();
    this.router.navigate([
      dashboardPath.dashboard,
      this.user!.id,
      dashboardPath.share,
    ]);
  }

  public onLogout(): void {
    this.isOpened = false;
    this.userService.logout();
  }

  public onToDo(): void {
    this.toggleAside();
    this.router.navigate([
      dashboardPath.dashboard,
      this.user!.id,
      dashboardPath.todo,
    ]);
  }

  public onSharedWithMe(): void {
    this.toggleAside();
    this.router.navigate([
      dashboardPath.dashboard,
      this.user!.id,
      dashboardPath.sharedWithMe,
    ]);
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
