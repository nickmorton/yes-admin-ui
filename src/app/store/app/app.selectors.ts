import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, APP_FEATURE_NAME } from './app.state';

const selectAppState = createFeatureSelector<AppState>(APP_FEATURE_NAME);

export const selectIsBusy = createSelector(
    selectAppState,
    state => state.isBusy
);
