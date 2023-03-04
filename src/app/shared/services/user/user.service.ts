import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  tap,
  map,
  zip,
  switchMap,
  Observable,
  catchError,
  BehaviorSubject,
} from 'rxjs';

import {
  ILogin,
  IRegistrations,
} from 'src/app/shared/interfaces/auth.interface';
import { IMainUserInfo, IUser } from 'src/app/shared/interfaces/user.interface';
import { TodoService } from '../todo/todo.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user = new BehaviorSubject<IUser | null>(null);

  constructor(
    private readonly http: HttpClient,
    private readonly todosService: TodoService
  ) {
    const user = localStorage.getItem('user');
    this.user.next(user ? JSON.parse(user) : null);
  }

  public getUser(): Observable<IUser | null> {
    return this.user.asObservable();
  }

  private setUser(user: IUser): void {
    if (!user) return;
    localStorage.setItem('user', JSON.stringify(user));

    this.user.next(user);
  }

  private clearUser(): void {
    localStorage.removeItem('user');

    this.user.next(null);
  }

  public login({ email, password }: ILogin): Observable<IUser> {
    return this.http
      .get<IUser[]>('users', {
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
  }: IRegistrations): Observable<IUser> {
    return this.http
      .get<IUser[]>('users', {
        params: { email },
      })
      .pipe(
        switchMap((users) => {
          if (users.length) throw new Error('user already exist');
          return this.http
            .post<IUser>('users', {
              name,
              email,
              password,
              sharedWithMe: [],
              share: [],
            } as IUser)
            .pipe(
              tap(this.setUser.bind(this)),
              tap((user) => this.todosService.createList(user.id!).subscribe()),
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

  public getByName(name: string): Observable<IMainUserInfo[]> {
    return this.http.get<IMainUserInfo[]>(`users?q=${name}`);
  }

  public share(info: IMainUserInfo): Observable<IUser> {
    const user = this.user.getValue()!;

    return zip(
      this.http
        .get<IUser[]>('users', {
          params: { id: info.id! },
        })
        .pipe(
          switchMap(([share]) =>
            this.http.put<IUser>(`users/${share.id}`, {
              ...user,
              sharedWithMe: [
                ...user!.share,
                { name: user.name, email: user.email, id: user.id },
              ],
            } as IUser)
          )
        ),

      this.http
        .put<IUser>(`users/${user!.id}`, {
          ...user,
          share: [...user!.share, info],
        } as IUser)
        .pipe(
          tap(this.setUser.bind(this)),
          catchError((err) => {
            console.log(err);
            throw err;
          })
        )
    ).pipe(map(([, self]) => self));
  }

  public unshare(id: number): Observable<IUser> {
    const user = this.user.getValue();

    return zip(
      this.http
        .get<IUser[]>('users', {
          params: { id },
        })
        .pipe(
          switchMap(([shareUser]) =>
            this.http.put<IUser>(`users/${shareUser!.id}`, {
              ...shareUser,
              sharedWithMe: shareUser.sharedWithMe.filter(
                (e) => e.id !== user!.id
              ),
            } as IUser)
          )
        ),
      this.http
        .put<IUser>(`users/${user!.id}`, {
          ...user,
          share: user!.share.filter((e) => e.id !== id),
        } as IUser)
        .pipe(
          tap(this.setUser.bind(this)),
          catchError((err) => {
            console.log(err);
            throw err;
          })
        )
    ).pipe(map(([, self]) => self));
  }

  public logout(): void {
    this.clearUser();
  }
}
