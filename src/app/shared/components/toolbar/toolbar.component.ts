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
import { IMainUserInfo } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  user: IMainUserInfo | null = null;
  subscription$ = new Subscription();
  destroy$ = new Subject();

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.subscription$ = this.authService
      .getUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        this.user = user;
        if (!user) this.router.navigate([authPath.auth, authPath.login]);
      });
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  @Output() onUserClick = new EventEmitter<any>();

  onClick() {
    this.onUserClick.emit();
  }
}
