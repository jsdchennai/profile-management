import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../core/services';
import { DialogService } from '../../../shared/services';
import { Router } from '@angular/router';
import { User } from '../../../models';

import { SignUpFormComponent } from '../../components';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.scss',
})
export class SignUpPageComponent implements OnInit {
  private authService = inject(AuthService);
  private dialogService = inject(DialogService);
  private router = inject(Router);

  @ViewChild('signUpFormCmpnt') signUpFormCmpnt: SignUpFormComponent;

  signUp(user: User): void {
    this.authService.signUp(user).subscribe({
      next: (res) => {
        const dialogRef = this.dialogService.openAlert(res, 'Success', 'info');

        setTimeout(() => {
          this.signUpFormCmpnt.resetForm();
          dialogRef.close();
          this.router.navigateByUrl('/login');
        }, 2000);
      },
      error: (err) => {
        this.dialogService.openAlert(err);
      },
    });
  }

  checkUserLoggedIn(): void {
    let token: string = localStorage.getItem('token');

    if (token != null) {
      this.router.navigateByUrl('/profile');
    }
  }

  ngOnInit(): void {
    this.checkUserLoggedIn();
  }
}
