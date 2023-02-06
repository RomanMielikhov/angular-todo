import { Injectable } from '@angular/core';
import { of, from, Observable, tap, catchError } from 'rxjs';

import {
  ILogin,
  IRegistrations,
} from 'src/app/shared/interfaces/auth.interface';
import { MessageService } from 'src/app/shared/services/message/message.service';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { ShareService } from '../share/share.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private messageService: MessageService,
    private snackbarService: SnackbarService,
    private shareService: ShareService,
    private userService: UserService
  ) {}

  login({ email, password }: ILogin) {}

  register({ name, email, password }: IRegistrations) {}

  public logout() {}
}
