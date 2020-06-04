import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';

import { AuthenticationService, SpinnerService, UserMessageService } from '../../services';

@Component({
	templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
	private _returnUrl: string;

	constructor(
		private readonly _authService: AuthService,
		private readonly _authenticationService: AuthenticationService,
		private readonly _router: Router,
		private readonly _activatedRoute: ActivatedRoute,
		private readonly _userMessageService: UserMessageService,
		private readonly _spinnerService: SpinnerService,
		title: Title
	) {

		if (this._authenticationService.currentUser) {
			this._router.navigate(['/']);
		}

		title.setTitle('Login');
	}

	ngOnInit() {
		this._returnUrl = this._activatedRoute.snapshot.queryParamMap.get('returnUrl') || '/';
	}

	authenticateWithGoogle() {
		this._authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
			socialUser => {
				this._spinnerService.show();
				this._authenticationService.authenticateWithGoogle(socialUser.idToken).subscribe(
					user => {
						console.log(user);
						this._router.navigate([this._returnUrl]);
					},
					error => {
						this._userMessageService.authenticationError();
						console.error(error);
					},
					() => this._spinnerService.hide());
			},
			error => {
				this._userMessageService.authenticationError();
				console.error(error);
			});
	}
}
