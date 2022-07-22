import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { status } from 'src/app/constants/status';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  defaultConfig: MatSnackBarConfig = new MatSnackBarConfig();

  getConfig(
    color?: 'primary' | 'accent' | 'warn' | 'error'
  ): MatSnackBarConfig {
    this.defaultConfig.panelClass = [
      'mat-toolbar',
      ...(color ? [`mat-${color}`] : []),
    ];
    this.defaultConfig.duration = 2000;
    this.defaultConfig.horizontalPosition = 'right';
    this.defaultConfig.verticalPosition = 'top';

    return this.defaultConfig;
  }

  success(message: string, action = '') {
    this.snackBar.open(message, action, this.getConfig());
  }

  warn(message: string, action = '', config?: MatSnackBarConfig) {
    this.snackBar.open(message, action, this.getConfig('warn'));
  }

  error(message: string, action = '', config?: MatSnackBarConfig) {
    this.snackBar.open(message, action, this.getConfig('error'));
  }
}
