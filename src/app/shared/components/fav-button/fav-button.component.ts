import { Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

import { color } from 'src/app/constants/color';

@Component({
  selector: 'app-fav-button',
  templateUrl: './fav-button.component.html',
  styleUrls: ['./fav-button.component.scss'],
})
export class FavButtonComponent {
  constructor() {}

  @Input() label?: string;
  @Input() isDisabled?: boolean;
  @Input() color?: ThemePalette = color.primary;
}
