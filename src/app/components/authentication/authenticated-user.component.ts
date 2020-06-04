import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { IAuthenticatedUser } from '@nickmorton/yes-admin-common';
import { AuthenticationService } from '../../services';

@Component({
	selector: 'app-authenticated-user',
	templateUrl: 'authenticated-user.component.html',
	styleUrls: ['authenticated-user.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticatedUserComponent implements OnInit {
	authenticatedUser$: Observable<IAuthenticatedUser>;

	constructor(private readonly _authenticationService: AuthenticationService, private readonly _router: Router) { }

	ngOnInit() {
		this.authenticatedUser$ = this._authenticationService.currentUser$;
	}

	onLogoutClick() {
		this._authenticationService.logout();
		this._router.navigate(['/login']);
	}
}
