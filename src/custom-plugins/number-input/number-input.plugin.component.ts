import { Component, Input } from '@angular/core';

@Component({
  selector: 'plugin-number-input',
  template: `<div class="container">
    <label for="head">My Age</label>
    <input type="number" id="head" name="head" [value]="count" />
  </div>`,
  standalone: true,
  styles: `.container {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
  }`,
})
export class NumberInputPluginComponent {
  @Input()
  public count = 99;
}
