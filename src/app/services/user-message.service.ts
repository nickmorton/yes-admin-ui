import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserMessageService {
    constructor(private readonly _matSnackBar: MatSnackBar) { }

    savedSuccessfully() {
        this._matSnackBar.open('Saved successfully');
    }

    serverError<TResult>(action: 'get' | 'post' | 'put', result?: TResult) {
        switch (action) {
            case 'get':
                this._matSnackBar.open('Server error fetching data');
                break;
            case 'post':
                this._matSnackBar.open('Server error creating entity');
                break;

            case 'put':
                this._matSnackBar.open('Server error updating entity');
                break;
        }

        return of(result);
    }

    authenticationError() {
        this._matSnackBar.open('Login failed');
    }
}
