import { createAction, props } from '@ngrx/store';

export const apiErrorReturned = createAction(
    '[App] API Error Returned',
    props<{ readonly action: 'get' | 'post' | 'put', readonly error: any }>()
);

export const setBusyState = createAction('[App] Set Busy State', props<{ readonly isBusy: boolean }>());
export const busyStateChanged = createAction('[App] Busy State Changed', props<{ readonly isBusy: boolean }>());
