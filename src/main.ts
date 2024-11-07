import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  COMPONENT_PLUGIN_TOKEN,
  PLUGIN_TOKEN,
} from './plugin-manager/interfaces/plugin.token';
// import { ColorPickerPlugin } from './custom-plugins/color-picker/color-picker.plugin';
import { PluginManagerService } from './plugin-manager/services/plugin-manager.service';
import { ColorPickerPluginComponent } from './custom-plugins/color-picker/color-picker.plugin.component';
import { PluginHostComponent } from './plugin-manager/components/plugin-host.component';
import { NumberInputPluginComponent } from './custom-plugins/number-input/number-input.plugin.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <section>
      <plugin-host></plugin-host>
    </section>
  `,
  imports: [
    PluginHostComponent,
    ColorPickerPluginComponent,
    NumberInputPluginComponent,
  ],
})
export class App {
  constructor(private pluginManagerService: PluginManagerService) {}

  public ngOnInit(): void {
    // this.pluginManagerService.runAllPlugins();
  }
}

bootstrapApplication(App, {
  providers: [
    // { provide: PLUGIN_TOKEN, useClass: ColorPickerPlugin, multi: true },
    {
      provide: COMPONENT_PLUGIN_TOKEN,
      useValue: {
        component: ColorPickerPluginComponent,
        inputs: { color: '#e66465' },
      },
      multi: true,
    },
    {
      provide: COMPONENT_PLUGIN_TOKEN,
      useValue: {
        component: NumberInputPluginComponent,
        inputs: { count: 999 },
      },
      multi: true,
    },
  ],
});
