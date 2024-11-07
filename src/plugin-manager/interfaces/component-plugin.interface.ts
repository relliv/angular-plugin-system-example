import { EventEmitter, Type } from '@angular/core';

export interface ComponentPlugin {
  component: Type<any>;
  inputs?: { [key: string]: any };
  outputs?: { [key: string]: EventEmitter<any> };
}
