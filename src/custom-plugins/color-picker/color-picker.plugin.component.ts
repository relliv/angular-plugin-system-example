import { Component, Input } from '@angular/core';

@Component({
  selector: 'plugin-color-picker',
  template: `<div class="container">
    <label for="head">My Fav Color</label>
    <input type="color" id="head" name="head" [value]="color" />
  </div>`,
  standalone: true,
  styles: `.container {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
  }`,
})
export class ColorPickerPluginComponent {
  @Input()
  public color!: string;
}
