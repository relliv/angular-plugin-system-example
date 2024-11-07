import {
  Component,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
  Renderer2,
  EventEmitter,
  ComponentRef,
ChangeDetectorRef,
} from '@angular/core';
import { PluginManagerService } from '../services/plugin-manager.service';
import { PluginWrapperComponent } from './plugin-wrapper.component';

@Component({
  selector: 'plugin-host',
  standalone: true,
  template: `<ng-container #pluginHost></ng-container>`,
})
export class PluginHostComponent implements AfterViewInit {
  @ViewChild('pluginHost', { read: ViewContainerRef, static: true })
  pluginHost!: ViewContainerRef;

  constructor(
    private pluginManager: PluginManagerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    const plugins = this.pluginManager.getPlugins() ?? [];

    plugins.forEach((plugin) => {
      // 1. Create the wrapper component dynamically
      const wrapperRef: ComponentRef<PluginWrapperComponent> =
        this.pluginHost.createComponent(PluginWrapperComponent);

      // 2. Use ChangeDetectorRef to ensure Angular detects changes
      this.cdr.detectChanges();

      // 3. Get the ViewContainerRef from the wrapper
      const wrapperViewContainer = wrapperRef.instance.viewContainerRef;

      if (!wrapperViewContainer) {
        console.error('ViewContainerRef not found on WrapperComponent');
        return;
      }

      // 4. Create the plugin component inside the wrapper
      const componentRef = wrapperViewContainer.createComponent(
        plugin.component
      );

      // 5. Set inputs dynamically
      if (plugin.inputs) {
        Object.entries(plugin.inputs).forEach(([key, value]) => {
          componentRef.setInput(key, value);
        });
      }

      // 6. Subscribe to outputs dynamically
      if (plugin.outputs) {
        Object.entries(plugin.outputs).forEach(([key, emitter]) => {
          const instance = componentRef.instance as any;
          if (instance[key] instanceof EventEmitter) {
            instance[key].subscribe(emitter.emit.bind(emitter));
          }
        });
      }
    });
  }
}