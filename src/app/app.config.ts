import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngxs/store';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';

import { routes } from './app.routes';
import { AuthState } from 'src/context/auth/infrastructure/state/auth.state';

export const appConfig: ApplicationConfig = {
	providers: [
		provideStore([AuthState], withNgxsLoggerPlugin()),
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
	],
};
