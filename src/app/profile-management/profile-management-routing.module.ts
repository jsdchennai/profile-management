import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalInformationSectionComponent } from './components/personal-information-section/personal-information-section.component';

const routes: Routes = [
  {
    path: '',
    component: PersonalInformationSectionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileManagementRoutingModule {}
