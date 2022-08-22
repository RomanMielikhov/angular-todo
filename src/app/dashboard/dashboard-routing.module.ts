import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { dashboardPath } from '../constants/routes';

import { ListsComponent } from './components/lists/lists.component';
import { ShareComponent } from './components/share/share.component';

import { AccessGuard } from '../shared/guards/access/access.guard';
import { ShareGuard } from '../shared/guards/share/share.guard';

const routes: Routes = [
  {
    path: `:id/${dashboardPath.todo}`,
    component: ListsComponent,
    canActivate: [AccessGuard],
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
