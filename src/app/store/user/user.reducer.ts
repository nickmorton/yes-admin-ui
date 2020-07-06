import { Action, createReducer, on } from '@ngrx/store';
import * as userActions from './user.actions';
import { initialUserState, userAdapter, UserState } from './user.state';

const reducer = createReducer(
    initialUserState,
    on(userActions.userAdded, (state, { data }) => {
        return userAdapter.addOne(data, state);
    }),

    on(userActions.user, (state, { data }) => {
        return userAdapter.setOne(data, state);
    }),

    on(userActions.users, (state, { data }) => {
        return userAdapter.setAll(data, state);
    }),

    on(userActions.userUpdated, (state, { data }) => {
        return userAdapter.upsertOne(data, state);
    }),
);

export function userReducer(state: UserState | undefined, action: Action) {
    return reducer(state, action);
}
