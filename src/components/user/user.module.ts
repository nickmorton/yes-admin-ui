import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../../directives/directives.module';
import { PipesModule } from '../../pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';
import { UserDetailComponent, UserDetailResolve } from './user-detail.component';
import { UserListComponent } from './user-list.component';
import { UserComponent } from './user.component';
import { userRoutes } from './user.routing';
import { UserService } from './user.service';

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
