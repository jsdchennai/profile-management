import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileManagementService {
  private http = inject(HttpClient);

  getDegrees() {
    return this.http.get('/degrees');
  }

  getInstitutions() {
    return this.http.get('/institutions');
  }

  getCompanies() {
    return this.http.get('/companies');
  }
}
