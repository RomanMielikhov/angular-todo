import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import {
  Auth,
  signOut,
  UserCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';

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
    private auth: Auth,
    private messageService: MessageService,
    private snackbarService: SnackbarService,
    private shareService: ShareService,
    private userService: UserService
  ) {
    this.auth.onAuthStateChanged((user) => {
      this.userService.getUserInfo(user?.uid);
    });
  }

  login({ email, password }: ILogin): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  register({
    name,
    email,
    password,
  }: IRegistrations): Observable<UserCredential> {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      tap((res) => {
        this.snackbarService.success(
          this.messageService.getMessageByStatusCode(200)
        );
        this.userService.create({ ...res.user, displayName: name });
        this.shareService.createShareList(res.user.uid);
      }),
      catchError((err) => {
        throw err;
      })
    );
  }

  public logout(): Observable<void> {
    return from(signOut(this.auth));
  }
}
