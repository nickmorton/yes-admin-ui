import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/rx';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
	constructor(private router: Router, private authenticationService: AuthenticationService) {
	}

	public canActivate(): boolean | Observable<boolean> {
		if (this.authenticationService.isLoggedIn) {
			return true;
		}

		this.router.navigate(['/login']);
		return false;
	}
}
