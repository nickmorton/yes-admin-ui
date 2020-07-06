import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { IUser } from '@nickmorton/yes-admin-common';

export const USER_FEATURE_NAME = 'user';

export interface UserState extends EntityState<IUser> {
}

export const userAdapter = createEntityAdapter<IUser>({ selectId: user => user._id });

export const initialUserState = userAdapter.getInitialState();
