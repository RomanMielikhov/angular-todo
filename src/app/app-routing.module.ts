import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authPath } from './constants/routes';

const routes: Routes = [
  {
    path: authPath.auth,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
