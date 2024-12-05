import { LocalStorageService } from './services/local-storage.service';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from './services/user.service';
import { Component, OnInit } from '@angular/core';
import { LocalStorageKeys } from './shared.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  token: string | null = '';

  constructor(
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.localStorageService.getItem(LocalStorageKeys.token)) {
      this.isLoggedIn = true;
    }
  }

  onClickLogin(): void {
    this.router.navigate(['/login']);
  }

  onClickSignup(): void {
    this.router.navigate(['/signup']);
  }

  onClickHome(): void {
    if (!this.isLoggedIn) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  async onClickLogout() {
    try {
      this.token = '';
      this.isLoggedIn = false;

      await this.userService.logout({});

      this.router.navigate(['/']);
    } catch {}
  }
}
