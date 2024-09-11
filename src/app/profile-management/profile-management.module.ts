import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileManagementRoutingModule } from './profile-management-routing.module';

import { components } from './components';
import { containers } from './containers';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [...components, ...containers],
  imports: [CommonModule, ProfileManagementRoutingModule, SharedModule],
})
export class ProfileManagementModule {}
