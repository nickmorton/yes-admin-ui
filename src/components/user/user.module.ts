import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { UserComponent } from './user.component';
import { UserListComponent, UserListResolve } from './user-list.component';
import { UserDetailComponent, UserDetailResolve } from './user-detail.component';
import { UserService } from './user.service';
import { userRoutes } from './user.routing';
import { PipesModule } from '../../pipes/pipes.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
	imports: [
		userRoutes,
		CommonModule,
		DirectivesModule,
		FlexLayoutModule,
		FormsModule,
		MaterialModule,
		PipesModule,
		ReactiveFormsModule,
	],
	declarations: [
		UserComponent,
		UserDetailComponent,
		UserListComponent,
	],
	providers: [
		UserDetailResolve,
		UserListResolve,
		UserService,
	],
})
export class UserModule {
}
