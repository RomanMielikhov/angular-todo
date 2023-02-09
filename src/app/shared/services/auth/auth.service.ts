import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  tap,
  map,
  switchMap,
  Observable,
  catchError,
  BehaviorSubject,
} from 'rxjs';

import {
  ILogin,
  IRegistrations,
} from 'src/app/shared/interfaces/auth.interface';
import { IMainUserInfo } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user = new BehaviorSubject<IMainUserInfo | null>(null);

  constructor(private http: HttpClient) {
    const user = localStorage.getItem('user');
    this.user.next(user ? JSON.parse(user) : null);
  }

  public getUser(): Observable<IMainUserInfo | null> {
    return this.user.asObservable();
  }

  private setUser(user: IMainUserInfo): void {
    if (!user) return;
    localStorage.setItem('user', JSON.stringify(user));

    this.user.next(user);
  }

  private clearUser(): void {
    localStorage.removeItem('user');

    this.user.next(null);
  }

  public login({ email, password }: ILogin): Observable<IMainUserInfo> {
    return this.http
      .get<IMainUserInfo[]>('/users', {
        params: { email, password },
      })
      .pipe(
        map(([user]) => {
          if (!user) {
            throw new Error('Bad credentials');
          }

          return user;
        }),
        tap((user) => this.setUser(user)),
        catchError((err) => {
          console.log(err);
          throw err;
        })
      );
  }

  public register({
    name,
    email,
    password,
  }: IRegistrations): Observable<IMainUserInfo> {
    return this.http
      .get<IMainUserInfo[]>('/users', {
        params: { email },
      })
      .pipe(
        switchMap((users) => {
          if (users.length) throw new Error('user alredy exist');
          return this.http
            .post<IMainUserInfo>('/users', { name, email, password })
            .pipe(
              tap(this.setUser.bind(this)),
              catchError((err) => {
                console.log(err);
                throw err;
              })
            );
        }),
        catchError((err) => {
          console.log(err);
          throw err;
        })
      );
  }

  public logout(): void {
    this.clearUser();
  }
}
