import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { ItemComponent } from './components/item/item.component';
import { ListComponent } from './components/list/list.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ListsComponent } from './components/lists/lists.component';
import { ShareComponent } from './components/share/share.component';
import { FieldModule } from '../shared/components/field/field.module';
import { ButtonModule } from '../shared/components/button/button.module';
import { FavButtonModule } from '../shared/components/fav-button/fav-button.module';

import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [ListComponent, ListsComponent, ItemComponent, ShareComponent],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatChipsModule,
    MatTableModule,
    ButtonModule,
    FieldModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    DragDropModule,
    FavButtonModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    DashboardRoutingModule,
  ],
})
export class DashboardModule {}
