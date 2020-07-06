import { Action, createReducer, on } from '@ngrx/store';
import * as appActions from './app.actions';
import { AppState, initialAppState } from './app.state';

const reducer = createReducer(
    initialAppState,
    on(appActions.busyStateChanged, (state, { isBusy }) => {
        return { ...state, isBusy };
    }),
);

export function appReducer(state: AppState | undefined, action: Action) {
    return reducer(state, action);
}
