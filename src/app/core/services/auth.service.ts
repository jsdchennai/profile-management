import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  login(loginCredentials: any) {
    return this.http.post('', loginCredentials);
  }

  isLoggedIn(): boolean {
    return true;
  }
}
