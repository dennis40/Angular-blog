import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    if (this.authService.isAuthenticated() && token) {
      request = request.clone({
        headers: request.headers.set('Authorization', token),
      });
    }
    return next.handle(request).pipe(
      catchError((error) => {
        console.log(error);
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/auth']);
        }
        return throwError(error);
      })
    );
  }
}
