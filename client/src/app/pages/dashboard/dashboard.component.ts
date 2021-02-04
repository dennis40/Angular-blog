import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService],
})
export class DashboardComponent implements OnInit {
  category: string | undefined;
  title: string | undefined;
  photo: string | undefined;
  text: string | undefined;

  constructor(
    private flash: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
    private dashboard: DashboardService
  ) {}

  ngOnInit(): void {}

  createPost() {
    const { category, title, photo, text } = this;
    const user = localStorage.getItem('user');

    let errorMsgs = [];
    if (!category) {
      errorMsgs.push('Select a category');
    }
    if (!title) {
      errorMsgs.push('Enter title');
    }
    if (!photo) {
      errorMsgs.push('Insert a photo');
    }
    if (!text) {
      errorMsgs.push('Enter text');
    }
    if (errorMsgs.length) {
      this.flash.show(errorMsgs.join('<br />'), {
        cssClass: 'alert-danger',
        timeout: 5000,
      });
      return;
    }
    const post = {
      category,
      title,
      photo,
      text,
      author: user && JSON.parse(user).login,
      date: new Date(),
    };
    this.dashboard.createPost(post).subscribe((response) => {
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
