import { InjectionToken } from '@angular/core';

export const LOCATION_INJECTION_TOKEN = new InjectionToken<Location>('location', { providedIn: 'root', factory: () => location });
