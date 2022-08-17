import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListsComponent } from './components/lists/lists.component';
import { ShareComponent } from './components/share/share.component';
import { dashboardPath } from '../constants/routes';
import { ShareGuard } from '../shared/guards/share/share.guard';

const routes: Routes = [
  {
    path: ':id',
    component: ListsComponent,
  },
  {
    path: `:id/${dashboardPath.share}`,
    component: ShareComponent,
    canActivate: [ShareGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
