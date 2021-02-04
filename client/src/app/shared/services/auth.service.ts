import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CreateUserRequest,
  CreateUserResponse,
} from '../interfaces/createUserRequest';
import { Observable } from 'rxjs';
import {
  AuthUser,
  AuthUserRequest,
  AuthUserResponse,
} from '../interfaces/authUser';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string | undefined;
  user: AuthUser | undefined;

  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService
  ) {}

  registerUser(user: CreateUserRequest): Observable<CreateUserResponse> {
    return this.http.post<CreateUserResponse>(
      'http://localhost:3000/account/reg',
      user
    );
  }

  authUser(user: AuthUserRequest): Observable<AuthUserResponse> {
    return this.http.post<AuthUserResponse>(
      'http://localhost:3000/account/auth',
      user
    );
  }

  storeUser({ token, user }: AuthUserResponse) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.token = token;
    this.user = user;
  }

  logout() {
    localStorage.clear();
    this.token = undefined;
    this.user = undefined;
  }

  isAuthenticated(): boolean {
    return !this.jwtHelperService.isTokenExpired(
      localStorage.getItem('token') || undefined
    );
  }
}
