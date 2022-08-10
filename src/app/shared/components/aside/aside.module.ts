import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AsideComponent } from './aside.component';

@NgModule({
  declarations: [AsideComponent],
  imports: [CommonModule, MatSidenavModule],
  exports: [AsideComponent],
})
export class AsideModule {}
