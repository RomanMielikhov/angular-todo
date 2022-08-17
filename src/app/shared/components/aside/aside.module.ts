import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CdkMenuModule } from '@angular/cdk/menu';

import { AsideComponent } from './aside.component';

@NgModule({
  declarations: [AsideComponent],
  imports: [CommonModule, MatSidenavModule, MatListModule, CdkMenuModule],
  exports: [AsideComponent],
})
export class AsideModule {}
