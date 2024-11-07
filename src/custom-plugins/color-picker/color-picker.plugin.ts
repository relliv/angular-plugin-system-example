import { Injectable } from '@angular/core';
import { Plugin } from '../../plugin-manager/interfaces/plugin.interface';

@Injectable()
export class ColorPickerPlugin implements Plugin {
  execute(...args: any[]): void {
    console.log('Custom Plugin Executed:', ...args);
  }
}
