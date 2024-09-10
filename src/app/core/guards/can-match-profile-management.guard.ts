import { CanMatchFn } from '@angular/router';

export const canMatchProfileManagementGuard: CanMatchFn = (route, segments) => {
  return true;
};
