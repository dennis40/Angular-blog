import { Injectable } from '@angular/core';
import { CreatePostRequest, CreatePostResponse } from '../interfaces/posts';
import { CreateUserResponse } from '../../../shared/interfaces/createUserRequest';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DashboardService {
  constructor(private http: HttpClient) {}

  createPost(post: CreatePostRequest) {
    return this.http.post<CreatePostResponse>(
      'http://localhost:3000/account/dashboard',
      post
    );
  }
}
