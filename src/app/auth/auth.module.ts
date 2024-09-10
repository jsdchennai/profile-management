import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { components } from './components';
import { contianers } from './containers';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [...components, ...contianers],
  imports: [AuthRoutingModule, SharedModule],
})
export class AuthModule {}
