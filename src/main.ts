import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
// import * as SystemJS from 'systemjs';

// plugin architecture
declare const SystemJS;
import * as angularCore from '@angular/core';
import * as angularCommon from '@angular/common';
SystemJS.set('@angular/core', SystemJS.newModule(angularCore));
SystemJS.set('@angular/common', SystemJS.newModule(angularCommon));


// -- plugin architecture

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
