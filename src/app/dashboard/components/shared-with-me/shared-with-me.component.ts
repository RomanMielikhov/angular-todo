import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Subject, takeUntil } from 'rxjs';

import { IUser } from 'src/app/shared/interfaces/user.interface';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-shared-with-me',
  templateUrl: './shared-with-me.component.html',
  styleUrls: ['./shared-with-me.component.scss'],
})
export class SharedWithMeComponent implements OnInit, OnDestroy {
  user: IUser | null = null;

  subscription$ = new Subscription();
  destroy$ = new Subject();

  constructor(private readonly userService: UserService) {}

  displayedColumns: string[] = ['name', 'email'];

  ngOnInit(): void {
    this.subscription$ = this.userService
      .getUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => (this.user = user));
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
