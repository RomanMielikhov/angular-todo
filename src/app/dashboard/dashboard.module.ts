import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FavButtonModule } from '../shared/components/fav-button/fav-button.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FieldModule } from '../shared/components/field/field.module';
import { ListsComponent } from './components/lists/lists.component';
import { ListComponent } from './components/list/list.component';
import { ItemComponent } from './components/item/item.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [ListComponent, ListsComponent, ItemComponent],
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatChipsModule,
    FieldModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    DragDropModule,
    FavButtonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
  ],
})
export class DashboardModule {}
