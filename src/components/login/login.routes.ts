import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LoginComponent } from './login.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
];

export const loginRouting: ModuleWithProviders = RouterModule.forRoot(routes);
