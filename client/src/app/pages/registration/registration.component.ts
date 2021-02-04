import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  public name!: string;
  public login!: string;
  public email!: string;
  public password!: string;

  constructor(
    private flash: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  signUp(): void {
    const { name, login, email, password } = this;
    const user = {
      name,
      login,
      email,
      password,
    };
    let errorMsgs = [];
    if (!name) {
      errorMsgs.push('Enter your name');
    }
    if (!login) {
      errorMsgs.push('Enter your login');
    }
    if (!email) {
      errorMsgs.push('Enter your email');
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
    this.authService.registerUser(user).subscribe((response) => {
      if (!response.success) {
        this.flash.show(response.msg, {
          cssClass: 'alert-danger',
          timeout: 5000,
        });
      } else {
        this.router.navigate(['/auth']);
      }
    });
  }
}
