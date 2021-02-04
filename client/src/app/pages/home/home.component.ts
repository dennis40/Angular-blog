import { Component, OnInit } from '@angular/core';
import { PostService } from '../../shared/services/post.service';
import { Post } from '../../shared/interfaces/post';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  categories = [
    'World',
    'Technology',
    'Design',
    'Culture',
    'Business',
    'Opinion',
    'Science',
    'Health',
    'Style',
    'Travel',
  ];
  chosenCategory = '';
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.initialValues();
  }

  private initialValues() {
    this.getPosts();
  }

  private getPosts() {
    this.postService
      .getAllPosts()
      .pipe(
        map((posts) => {
          return posts.map((post) => ({
            ...post,
            text: post.text.substring(0, 250),
          }));
        })
      )
      .subscribe((response) => {
        this.posts = response;
      });
  }

  setCategory(category: string) {
    this.chosenCategory = category;
  }
}
