import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';
// import { LoginComponent } from './auth/components/login/login.component';

import { authPath, dashboardPath } from './constants/routes';

const routes: Routes = [
  {
    path: authPath.auth,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    // component: LoginComponent,
  },

  // {
  //   path: `${dashboardPath.dashboard}/:id`,
  //   loadChildren: () =>
  //     import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  // },
  {
    path: dashboardPath.dashboard,
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [AuthGuard],
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
