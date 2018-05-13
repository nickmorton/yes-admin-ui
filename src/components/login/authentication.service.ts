import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
	public isLoggedIn = false;

	public login = (): Observable<boolean> => {
		return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
	}

	public logout = (): void => {
		this.isLoggedIn = false;
	}
}
