import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthenticatedUserComponent } from './authenticated-user.component';
import { LoginComponent } from './login.component';


@NgModule(
	{
		declarations: [AuthenticatedUserComponent, LoginComponent],
		exports: [AuthenticatedUserComponent, LoginComponent],
		imports: [CommonModule]
	},
)
export class AuthenticationModule {
}
