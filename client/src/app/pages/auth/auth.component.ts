import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public login!: string;
  public password!: string;
  constructor(
    private flash: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  signIn() {
    const { login, password } = this;
    const user = {
      login,
      password,
    };
    let errorMsgs = [];

    if (!login) {
      errorMsgs.push('Enter your login');
    }
    if (!password) {
      errorMsgs.push('Enter your password');
    }
    if (errorMsgs.length) {
      this.flash.show(errorMsgs.join('<br />'), {
        cssClass: 'alert-danger',
        timeout: 5000,
      });
      return;
    }
    this.authService.authUser(user).subscribe((response) => {
      if (!response.success) {
        this.flash.show(response.msg, {
          cssClass: 'alert-danger',
          timeout: 5000,
        });
      } else {
        this.authService.storeUser(response);
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
