import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Use top-level await - ES2022 modules support this
try {
  await bootstrapApplication(AppComponent, appConfig);
} catch (err) {
  console.error(err);
}
