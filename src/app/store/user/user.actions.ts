import { createAction, props } from '@ngrx/store';
import { IUser, TEntitySort } from '@nickmorton/yes-admin-common';

export const getUsers = createAction('[User] Get Users', props<{ name: string, sort: TEntitySort<IUser>, limit: number }>());
export const users = createAction('[User] Users', props<{ readonly data: IUser[] }>());

export const getUser = createAction('[User] Get User', props<{ readonly userId: string }>());
export const user = createAction('[User] User', props<{ readonly data: IUser }>());

export const addUser = createAction('[User] Add User', props<{ readonly data: IUser }>());
export const userAdded = createAction('[User] User Added', props<{ readonly data: IUser }>());

export const updateUser = createAction('[User] Update User', props<{ readonly data: IUser }>());
export const userUpdated = createAction('[User] User Updated', props<{ readonly data: IUser }>());
