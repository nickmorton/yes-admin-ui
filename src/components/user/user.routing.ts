import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from '../user/user.component';
import { UserDetailComponent, UserDetailResolve } from './user-detail.component';
import { UserListComponent } from './user-list.component';

const routes: Routes = [
	{
		path: 'users', component: UserComponent, children: [
			{
				path: '',
				component: UserListComponent,
			},
			{
				path: 'add',
				component: UserDetailComponent,
				resolve: { data: UserDetailResolve },
			},
			{
				path: ':userId',
				component: UserDetailComponent,
				resolve: { data: UserDetailResolve },
			},
		],
	},
];

export const userRoutes: ModuleWithProviders = RouterModule.forChild(routes);
