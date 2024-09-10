import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpAuthInterceptor } from './http-auth.interceptor';

export const httpInterceptorProviders = [
  provideHttpClient(withInterceptors([httpAuthInterceptor])),
];

export * from './http-auth.interceptor';
