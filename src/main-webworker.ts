import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'core-js/es7/reflect'; // can be removed for AOT
import { WebWorkerModule } from './app/web-worker.module';

enableProdMode();

platformBrowserDynamic()
  .bootstrapModule(WebWorkerModule, {
    ngZone: 'noop',
  })
  .catch(err => console.log(err));
