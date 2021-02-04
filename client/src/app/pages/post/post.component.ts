import { Component, OnInit } from '@angular/core';
import { PostService } from '../../shared/services/post.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Post } from '../../shared/interfaces/post';
import { AuthService } from '../../shared/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  post$: Observable<Post> | undefined;
  login: string | undefined;
  constructor(
    private postService: PostService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private flash: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initialValues();
    this.initialListeners();
  }

  private initialValues() {
    if (this.authService.isAuthenticated()) {
      const user = localStorage.getItem('user');
      this.login = user && JSON.parse(user).login;
    }
  }

  private initialListeners() {
    this.post$ = this.activatedRoute.params.pipe(
      switchMap(({ id }: Params) => this.postService.getPostById(id))
    );
  }

  deletePost(id: string) {
    this.postService.deletePostById(id).subscribe((response) => {
      if (!response.success) {
        this.flash.show(response.msg, {
          cssClass: 'alert-danger',
          timeout: 5000,
        });
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
