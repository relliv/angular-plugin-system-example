import { InjectionToken } from '@angular/core';
import { Plugin } from './plugin.interface';
import { ComponentPlugin } from './component-plugin.interface';

export const PLUGIN_TOKEN = new InjectionToken<Plugin[]>('PLUGIN_TOKEN');

export const COMPONENT_PLUGIN_TOKEN = new InjectionToken<ComponentPlugin[]>(
  'COMPONENT_PLUGIN_TOKEN'
);
