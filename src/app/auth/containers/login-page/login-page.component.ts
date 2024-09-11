import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services';
import { Credentials } from '../../../models';
import { Router } from '@angular/router';
import { DialogService } from '../../../shared/services';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private dialogService = inject(DialogService);

  login(credentials: Credentials) {
    this.authService.login(credentials).subscribe(
      (res) => {
        localStorage.setItem('name', res.name);
        localStorage.setItem('email', res.email);
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/profile');
      },
      (err) => {
        this.dialogService.openAlert(err);
      }
    );
  }

  checkUserLoggedIn() {
    let token: string = localStorage.getItem('token');

    if (token != null) {
      this.router.navigateByUrl('/profile');
    }
  }

  ngOnInit(): void {
    this.checkUserLoggedIn();
  }
}
