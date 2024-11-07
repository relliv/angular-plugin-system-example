import {
  Injectable,
  Inject,
  Optional,
  ViewContainerRef,
  Type,
  EventEmitter,
} from '@angular/core';
import { COMPONENT_PLUGIN_TOKEN } from '../interfaces/plugin.token';
import { ComponentPlugin } from '../interfaces/component-plugin.interface';

@Injectable({
  providedIn: 'root',
})
export class PluginManagerService {
  constructor(
    @Optional()
    @Inject(COMPONENT_PLUGIN_TOKEN)
    private plugins: ComponentPlugin[] = []
  ) {}

  getPlugins(): ComponentPlugin[] {
    return this.plugins;
  }

  loadComponent(
    viewContainerRef: ViewContainerRef,
    componentType: Type<any>,
    inputs?: { [key: string]: any },
    outputs?: { [key: string]: EventEmitter<any> }
  ): void {
    const componentRef = viewContainerRef.createComponent(componentType);

    if (inputs) {
      Object.entries(inputs).forEach(([key, value]) => {
        componentRef.setInput(key, value);
      });
    }

    if (outputs) {
      Object.entries(outputs).forEach(([key, emitter]) => {
        const instance = componentRef.instance as any;
        if (instance[key] instanceof EventEmitter) {
          instance[key].subscribe(emitter.emit.bind(emitter));
        }
      });
    }
  }
}
