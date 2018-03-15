import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {SharedModule} from '../shared/shared.module';
import { UserComponent } from './user.component';
import { UserListComponent } from './user-list.component';
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
		PipesModule,
		ReactiveFormsModule,
		SharedModule
	],
	declarations: [
		UserComponent,
		UserDetailComponent,
		UserListComponent,
	],
	providers: [
		UserDetailResolve,
		UserService,
	],
})
export class UserModule {
}
