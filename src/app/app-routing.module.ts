import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authPath, dashboardPath } from './constants/routes';

const routes: Routes = [
  {
    path: authPath.auth,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: dashboardPath.dashboard,
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
