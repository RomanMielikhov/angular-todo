import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideModule } from '../aside/aside.module';
import { LayoutComponent } from './layout.component';
import { ToolbarModule } from '../toolbar/toolbar.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, ToolbarModule, AsideModule],
  exports: [LayoutComponent],
})
export class LayoutModule {}
