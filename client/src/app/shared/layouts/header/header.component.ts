import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private flash: FlashMessagesService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {}

  logoutUser() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
