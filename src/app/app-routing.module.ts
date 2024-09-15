import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canMatchProfileManagementGuard } from './core/guards';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile-management/profile-management.module').then(
        (m) => m.ProfileManagementModule
      ),
    canMatch: [canMatchProfileManagementGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
