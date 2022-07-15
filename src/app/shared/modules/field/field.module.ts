import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

import { FieldComponent } from '../../components/field/field.component';

@NgModule({
  declarations: [FieldComponent],
  imports: [MatFormFieldModule, CommonModule],
  exports: [FieldComponent],
})
export class FieldModule {}
