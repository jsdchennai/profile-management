import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpInterceptorProviders } from './interceptors';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [...httpInterceptorProviders],
})
export class AppCoreModule {}
