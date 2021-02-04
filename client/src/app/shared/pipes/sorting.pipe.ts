import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../interfaces/post';

@Pipe({
  name: 'sorting',
})
export class SortingPipe implements PipeTransform {
  transform(posts: Post[], category = ''): Post[] {
    if (!category) {
      return posts;
    }
    return posts.filter(
      (post) => post.category.toLowerCase() === category.toLowerCase()
    );
  }
}
