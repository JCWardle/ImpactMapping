import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app.module';
import './styles.scss';

platformBrowserDynamic().bootstrapModule(AppModule);
