import { createFeatureSelector } from '@ngrx/store';
import { userAdapter, UserState, USER_FEATURE_NAME } from './user.state';

const selectUserState = createFeatureSelector<UserState>(USER_FEATURE_NAME);

export const {
    selectIds: selectUserIds,
    selectEntities: selectUserEntities,
    selectAll: selectAllUsers,
    selectTotal: selectTotalUsers,
} = userAdapter.getSelectors(selectUserState);
