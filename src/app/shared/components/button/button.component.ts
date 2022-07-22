import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { buttonType } from '../../../constants/buttonType';
import { color } from '../../../constants/color';
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() label?: string;
  @Input() isLoading?: boolean;
  @Input() isDisabled?: boolean;
  @Input() type?: string = buttonType.button;
  @Input() color?: ThemePalette = color.primary;
  @Input() spinnerColor?: ThemePalette = color.accent;

  constructor() {}
}
