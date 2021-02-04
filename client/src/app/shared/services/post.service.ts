import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeletePostResponse, Post } from '../interfaces/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('http://localhost:3000');
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`http://localhost:3000/post/${id}`);
  }

  deletePostById(id: string): Observable<DeletePostResponse> {
    return this.http.delete<DeletePostResponse>(
      `http://localhost:3000/post/${id}`
    );
  }
}
