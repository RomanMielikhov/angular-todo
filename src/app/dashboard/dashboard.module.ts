import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { FieldModule } from '../shared/components/field/field.module';
import { ButtonModule } from '../shared/components/button/button.module';
import { FavButtonModule } from '../shared/components/fav-button/fav-button.module';

import { ItemComponent } from './components/item/item.component';
import { ListComponent } from './components/list/list.component';
import { ShareComponent } from './components/share/share.component';
import { ListsComponent } from './components/lists/lists.component';
import { OrderByPipe } from '../shared/pipes/orderBy/order-by.pipe';
import { DateFormatPipe } from '../shared/pipes/dateFormat/dateFormat.pipe';
import { SharedWithMeComponent } from './components/shared-with-me/shared-with-me.component';

@NgModule({
  providers: [OrderByPipe, DateFormatPipe],
  declarations: [
    OrderByPipe,
    ListComponent,
    ItemComponent,
    ListsComponent,
    ShareComponent,
    DateFormatPipe,
    SharedWithMeComponent,
  ],
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
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
