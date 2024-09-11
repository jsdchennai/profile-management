import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, filter, of, tap, throwError } from 'rxjs';
import { Credentials, User } from '../../models';
import { Users } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  login(credentials: Credentials) {
    let token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

    let user = Users.find(
      (user) =>
        user.email == credentials.email && user.password == credentials.password
    );

    if (user) {
      let userWithToken = { ...user, token };
      return of(userWithToken).pipe(delay(1000));
    }

    return throwError(() => 'User not found').pipe(delay(1000));
  }

  signUp(user: User) {
    Users.push(user);

    return of('User created successfully').pipe(delay(1000));
  }

  isLoggedIn(): boolean {
    return true;
  }
}
