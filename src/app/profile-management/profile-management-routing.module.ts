import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileManagementPageComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: ProfileManagementPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileManagementRoutingModule {}
