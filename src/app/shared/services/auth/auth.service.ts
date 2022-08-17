import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import {
  Auth,
  signOut,
  UserCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';

import { of, from, Observable } from 'rxjs';

import {
  ILogin,
  IRegistrations,
} from 'src/app/shared/interfaces/auth.interface';
import { MessageService } from 'src/app/shared/services/message/message.service';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: Auth,
    private messageService: MessageService,
    private snackbarService: SnackbarService,
    private userService: UserService
  ) {
    this.auth.onAuthStateChanged((user) => {
      this.userService.getUserInfo(user?.uid);
    });
  }

  async login({ email, password }: ILogin): Promise<UserCredential | null> {
    try {
      const res = await signInWithEmailAndPassword(this.auth, email, password);

      return res;
    } catch (error) {
      if (error instanceof FirebaseError) {
        this.snackbarService.warn(
          this.messageService.getMessageByFirebaseCode(error.code)
        );
      }
      return null;
    }
  }

  async register({
    name,
    email,
    password,
  }: IRegistrations): Promise<UserCredential | boolean> {
    try {
      const res = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      this.snackbarService.success(
        this.messageService.getMessageByStatusCode(200)
      );

      this.userService.create({ ...res.user, displayName: name });

      return res;
    } catch (error) {
      if (error instanceof FirebaseError) {
        this.snackbarService.warn(
          this.messageService.getMessageByFirebaseCode(error.code)
        );
      }

      return false;
    }
  }

  public logout(): Observable<void> {
    return from(signOut(this.auth));
  }
}
