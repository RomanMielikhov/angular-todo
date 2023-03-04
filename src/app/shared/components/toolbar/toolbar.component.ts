import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Subject, takeUntil } from 'rxjs';

import { authPath } from 'src/app/constants/routes';
import { IMainUserInfo } from 'src/app/shared/interfaces/user.interface';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  user: IMainUserInfo | null = null;
  subscription$ = new Subscription();
  destroy$ = new Subject();

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit() {
    this.subscription$ = this.userService
      .getUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        this.user = user;
        if (!user) this.router.navigate([authPath.auth, authPath.login]);
      });
  }

  @Output() onUserClick = new EventEmitter<any>();

  public onClick() {
    this.onUserClick.emit();
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
