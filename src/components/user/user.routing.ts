import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { UserComponent } from '../user/user.component';
import { UserListComponent, UserListResolve } from './user-list.component';
import { UserDetailComponent, UserDetailResolve } from './user-detail.component';

const routes: Routes = [
	{
		path: 'users', component: UserComponent, children: [
			{
				path: '',
				component: UserListComponent,
				resolve: { data: UserListResolve },
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
