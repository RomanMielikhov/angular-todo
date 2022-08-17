import { Router, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Injectable, OnDestroy } from '@angular/core';
import { Auth, Unsubscribe } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad, OnDestroy {
  constructor(public router: Router, private auth: Auth) {}

  canLoad(route: Route, segments: UrlSegment[]): Promise<boolean | UrlTree> {
    return new Promise<boolean>((resolve) => {
      this.unsubscribe = this.auth.onAuthStateChanged((user) => {
        if (user) return resolve(true);
        return resolve(this.router.navigate(['auth', 'login']));
      });
    });
  }
  private unsubscribe: Unsubscribe | null = null;

  ngOnDestroy(): void {
    // is it legal?
    if (this.unsubscribe) this.unsubscribe();
  }
}
