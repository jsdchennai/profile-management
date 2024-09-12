import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileManagementRoutingModule } from './profile-management-routing.module';

import { components } from './components';
import { containers } from './containers';
import { SharedModule } from '../shared/shared.module';
import { FormGroupDirective } from '@angular/forms';

@NgModule({
  declarations: [...components, ...containers],
  imports: [ProfileManagementRoutingModule, SharedModule],
  providers: [FormGroupDirective],
})
export class ProfileManagementModule {}
