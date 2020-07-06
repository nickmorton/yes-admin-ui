import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concat, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { UserService } from '@yes/services';
import { appActions } from '@yes/store/app';
import * as userActions from './user.actions';

@Injectable()
export class UserEffects {
    constructor(private readonly actions$: Actions, private readonly userService: UserService) { }

    getUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(userActions.getUser),
            mergeMap(action =>
                concat(
                    of(appActions.setBusyState({ isBusy: true })),
                    this.userService.getById(action.userId).pipe(
                        mergeMap(respone => of(userActions.user({ data: respone.entity }), appActions.setBusyState({ isBusy: false }))),
                        catchError(error => of(
                            appActions.setBusyState({ isBusy: false }),
                            appActions.apiErrorReturned({ action: 'get', error }))
                        )
                    )
                )
            )
        )
    );

    getUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(userActions.getUsers),
            mergeMap(action =>
                concat(
                    of(appActions.setBusyState({ isBusy: true })),
                    this.userService.get({ name: action.name, skip: 0, limit: action.limit, sort: action.sort }).pipe(
                        mergeMap(respone => of(userActions.users({ data: respone.entities }), appActions.setBusyState({ isBusy: false }))),
                        catchError(error => of(
                            appActions.setBusyState({ isBusy: false }),
                            appActions.apiErrorReturned({ action: 'get', error }))
                        )
                    )
                )
            )
        )
    );
}
