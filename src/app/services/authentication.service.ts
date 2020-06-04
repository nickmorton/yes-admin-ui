import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { IAuthenticatedUser } from '@nickmorton/yes-admin-common';

const TOKEN_KEY = 'auth_user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
	private readonly _currentUserSubject: BehaviorSubject<IAuthenticatedUser>;

	get currentUser() {
		return this._currentUserSubject.value;
	}

	get currentUser$() {
		return this._currentUserSubject.asObservable();
	}

	constructor(private readonly _http: HttpClient) {
		this._currentUserSubject = new BehaviorSubject<IAuthenticatedUser>(this._getUser());
	}

	authenticateWithGoogle(token: string) {
		return this._http
			.post<IAuthenticatedUser>('api/auth/google/token', null, { headers: { Authorization: `Bearer ${token}` } })
			.pipe(
				map(user => ({ ...user, token })),
				tap(user => {
					this._saveUser(user);
					this._currentUserSubject.next(user);
				}));
	}

	logout() {
		this._clearUser();
		this._currentUserSubject.next(null);
	}

	private _saveUser(user: IAuthenticatedUser) {
		localStorage.setItem(TOKEN_KEY, JSON.stringify(user));
	}

	private _getUser() {
		try {
			return JSON.parse(localStorage.getItem(TOKEN_KEY) || null) as IAuthenticatedUser;
		} catch{
			return null;
		}
	}

	private _clearUser() {
		return localStorage.removeItem(TOKEN_KEY);
	}
}
