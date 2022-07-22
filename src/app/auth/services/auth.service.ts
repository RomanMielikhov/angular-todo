import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import {
  Auth,
  signOut,
  UserCredential,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';
import { IRegistrations, ILogin } from 'src/app/shared/interfaces/auth';
import { MessageService } from 'src/app/shared/services/message/message.service';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: Auth,
    private messageService: MessageService,
    private snackbarService: SnackbarService
  ) {}

  async login({ email, password }: ILogin) {
    try {
      const res = await signInWithEmailAndPassword(this.auth, email, password);
      console.log(res);
    } catch (error) {}
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
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

  logout() {
    return signOut(this.auth);
  }
}
