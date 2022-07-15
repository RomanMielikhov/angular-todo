import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authPath } from './constants/routes';

const routes: Routes = [
  {
    path: authPath.auth,
    loadChildren: () =>
      import('./auth/auth-routing.module').then((m) => m.AuthRoutingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
