import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../services';
import { LOCATION_INJECTION_TOKEN } from './injection-tokens';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor(
		private readonly _authenticationService: AuthenticationService,
		@Inject(LOCATION_INJECTION_TOKEN) private readonly _location: Location) { }

	intercept(request: HttpRequest<any>, nextHandler: HttpHandler): Observable<HttpEvent<any>> {
		return nextHandler.handle(request).pipe(catchError(err => {
			if (err.status === 401) {
				// auto logout if 401 response returned from api
				this._authenticationService.logout();
				this._location.reload(true);
			}

			const error = err.error.message || err.statusText;
			return throwError(error);
		}));
	}
}
