import { AppState, APP_FEATURE_NAME } from './app';
import { UserState, USER_FEATURE_NAME } from './user';

export interface RootState {
    [APP_FEATURE_NAME]: AppState;
    [USER_FEATURE_NAME]: UserState;
}
