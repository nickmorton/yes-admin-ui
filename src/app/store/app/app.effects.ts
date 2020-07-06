import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { SpinnerService, UserMessageService } from '@yes/services';
import { appActions } from './';

@Injectable()
export class AppEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly spinnerService: SpinnerService,
        private readonly userMessageService: UserMessageService) { }

    apiErrorReturned$ = createEffect(() =>
        this.actions$.pipe(
            ofType(appActions.apiErrorReturned),
            map(action => this.userMessageService.serverError(action.action, action.error))
        ),
        { dispatch: false }
    );

    setBusyState$ = createEffect(() =>
        this.actions$.pipe(
            ofType(appActions.setBusyState),
            mergeMap(action => {
                action.isBusy ? this.spinnerService.show() : this.spinnerService.hide();
                return of(appActions.busyStateChanged({ isBusy: action.isBusy }));
            })
        )
    );
}
