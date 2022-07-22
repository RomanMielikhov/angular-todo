import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MessageService } from '../../services/message/message.service';

enum ErrorType {
  REQUIRED = 'required',
  MAX_LENGTH = 'maxlength',
  MIN_LENGTH = 'minlength',
  MAX = 'max',
  MIN = 'min',
  EMAIL = 'email',
  DIGITS = 'digits',
  EMAIL_REGISTERED = 'emailRegistered',
  SERVER_ERROR = 'serverError',
}

@Component({
  selector: 'app-field-error',
  templateUrl: './field-error.component.html',
  styleUrls: ['./field-error.component.scss'],
})
export class FieldErrorComponent {
  @Input() label: string = '';
  @Input('control') formControl!: FormControl;

  error = ErrorType;

  constructor(private messageService: MessageService) {}

  msg(
    error: ErrorType,
    replacement: { replace: string; with: any }[] = []
  ): string {
    let message = this.messageService.getFieldError(error);
    replacement.forEach((r) => (message = message.replace(r.replace, r.with)));
    return message;
  }

  getError(err: ErrorType, key: string = ''): any {
    return key
      ? this.formControl.getError(err)[key]
      : this.formControl.getError(err);
  }

  hasError(err: ErrorType): boolean {
    return this.formControl.hasError(err);
  }

  get showErrors(): boolean {
    return this.formControl.touched && this.formControl.invalid;
  }
}
