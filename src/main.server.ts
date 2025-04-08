import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import {provideServerRendering} from '@angular/platform-server';
import {appConfig} from './app/app.config';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;

// export default () => bootstrapApplication(AppComponent, {
//   ...appConfig,
//   providers: [provideServerRendering(), ...appConfig.providers],
// });
