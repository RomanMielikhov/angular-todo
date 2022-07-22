import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { SnackbarService } from '../services/snackbar/snackbar.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(public snackbarService: SnackbarService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('intercept');
    return next.handle(req).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse) {
          console.log('RESPONCE', evt.body);
          if (evt.body && evt.body.success)
            this.snackbarService.success(
              evt.body.success.message,
              evt.body.success.title
            );
        }
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          try {
            this.snackbarService.error(err.error.message);
          } catch (e) {
            this.snackbarService.error('An error occurred');
          }
          //log error
        }
        return of(err);
      })
    );
  }
}
