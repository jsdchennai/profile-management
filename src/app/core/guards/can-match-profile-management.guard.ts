import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

export const canMatchProfileManagementGuard: CanMatchFn = (route, segments) => {
  let token = localStorage.getItem('token');
  let router = inject(Router);

  if (token != null) {
    return true;
  }

  router.navigateByUrl('/login');
  return false;
};
