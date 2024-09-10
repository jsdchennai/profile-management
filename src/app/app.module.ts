import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SharedModule } from './shared/shared.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpAuthInterceptor } from './core/interceptors/http-auth.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule.forRoot()],
  providers: [
    provideAnimationsAsync('animations'),
    provideHttpClient(withInterceptors([httpAuthInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
