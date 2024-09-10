import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalInformationSectionComponent } from './components/personal-information-section/personal-information-section.component';
import { ProfileManagementRoutingModule } from './profile-management-routing.module';

@NgModule({
  declarations: [PersonalInformationSectionComponent],
  imports: [CommonModule, ProfileManagementRoutingModule],
})
export class ProfileManagementModule {}
