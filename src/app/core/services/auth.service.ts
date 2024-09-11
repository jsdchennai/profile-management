import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { filter, of, tap, throwError } from 'rxjs';
import { Credentials } from '../../models';
import { Users } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  login(credentials: Credentials) {
    // return this.http
    //   .post('/login', credentials)
    //   .pipe(tap((a) => console.log(a)));

    let user = Users.find(
      (user) =>
        user.email == credentials.email && user.password == credentials.password
    );

    let token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

    if (user) {
      let userWithToken = { ...user, token };
      return of(userWithToken);
    }

    return throwError(() => 'User not found');
  }

  isLoggedIn(): boolean {
    return true;
  }
}
