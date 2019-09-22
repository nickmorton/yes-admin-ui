import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UserMessageService {
    constructor(private readonly _matSnackBar: MatSnackBar) { }

    savedSuccessfully() {
        this._matSnackBar.open('Saved successfully');
    }
}
