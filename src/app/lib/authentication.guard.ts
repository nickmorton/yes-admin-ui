import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services';

@Injectable({ providedIn: 'root' })
export class AuthenticationeGuard implements CanActivate {
	constructor(private readonly _authenticationService: AuthenticationService, private readonly _router: Router) { }

	canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if (this._authenticationService.currentUser) {
			return true;
		}

		this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } })
		return false;
	}
}
