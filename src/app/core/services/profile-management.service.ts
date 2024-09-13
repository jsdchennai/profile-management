import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileManagementService {
  private http = inject(HttpClient);

  constructor() {}

  getDegrees() {
    return this.http.get('/degrees');
  }
}
