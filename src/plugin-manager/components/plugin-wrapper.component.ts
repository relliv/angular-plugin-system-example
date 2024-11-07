import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'plugin-wrapper',
  standalone: true,
  template: `<div class="plugin-wrapper"><ng-container #container></ng-container></div>`,
  styles: [
    `
    .plugin-wrapper {
      margin: 10px;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #f9f9f9;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    `,
  ],
})
export class PluginWrapperComponent implements AfterViewInit {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  viewContainerRef!: ViewContainerRef;

  ngAfterViewInit(): void {
    // Ensure ViewContainerRef is available in lifecycle
    console.log('ViewContainerRef initialized:', this.viewContainerRef);
  }
}
