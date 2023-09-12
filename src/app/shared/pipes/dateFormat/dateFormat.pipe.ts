import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(value?: string): string {
    if (!value) return '';

    const date = new Date(value);

    return new Intl.DateTimeFormat(navigator.language, {
      dateStyle: 'medium',
      timeStyle: 'medium',
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }).format(date);
  }
}
