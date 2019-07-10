import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from '../user/user.component';
import { UserDetailComponent, UserDetailResolve } from './user-detail.component';
import { UserListComponent } from './user-list.component';
import {
	UserVisitComponent,
	UserVisitDetailComponent,
	UserVisitDetailResolve,
	UserVisitListComponent,
	UserVisitListResolve
} from './visit';

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
				// TODO: Add a UserHeader component for user navigation, name headers, etc. The resolve would be on this segment too.
				children: [
					{
						path: '',
						component: UserDetailComponent,
						resolve: { data: UserDetailResolve },
					},
					{
						path: 'visits', component: UserVisitComponent, children: [
							{
								path: '',
								component: UserVisitListComponent,
								resolve: { data: UserVisitListResolve },
							},
							{
								path: 'add',
								component: UserVisitDetailComponent,
								resolve: { data: UserVisitDetailResolve },
							},
							{
								path: 'latest',
								data: { latest: true },
								component: UserVisitDetailComponent,
								resolve: { data: UserVisitDetailResolve },
							},
							{
								path: ':visitId',
								component: UserVisitDetailComponent,
								resolve: { data: UserVisitDetailResolve },
							}
						]
					}
				]
			},
		],
	},
];

export const userRoutes: ModuleWithProviders = RouterModule.forChild(routes);
