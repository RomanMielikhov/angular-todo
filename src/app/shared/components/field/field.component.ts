import { Component, Input, forwardRef } from '@angular/core';
import {
  FormGroup,
  FormControl,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
} from '@angular/forms';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FieldComponent),
      multi: true,
    },
  ],
})
export class FieldComponent implements ControlValueAccessor {
  @Input() hint?: string;
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() parentForm?: FormGroup;
  @Input() formControlName!: string;
  @Input() isHidden?: boolean = false;

  public value: string = '';
  public isDisabled: boolean = false;
  public fieldType: string = 'text';
  public isHide: boolean = true;

  public changed: (value: string) => void = () => {};

  public touched: () => void = () => {};

  constructor() {}

  get formControl(): FormControl {
    return this.parentForm?.get(this.formControlName) as FormControl;
  }
  get type(): string {
    return this.isHidden && this.isHide ? 'password' : this.fieldType;
  }

  public writeValue(value: string): void {
    this.value = value;
  }

  public onChange(event: Event): void {
    this.changed((<HTMLInputElement>event.target).value);
  }

  public registerOnChange(fn: any): void {
    this.changed = fn;
  }

  public registerOnTouched(fn: any): void {
    this.touched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  public getErrorMessage(): string {
    console.log(this.formControl);
    return 'ERROR';
  }

  public setHideInputValue(): void {
    this.isHide = !this.isHide;
  }
}
