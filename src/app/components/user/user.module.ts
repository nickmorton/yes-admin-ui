import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../../directives/directives.module';
import { PipesModule } from '../../pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';
import { UserDetailComponent, UserDetailResolve } from './user-detail.component';
import { UserListComponent } from './user-list.component';
import { UserRoutingModule } from './user-routing.module';
import { UserSummaryComponent } from './user-summary.component';
import { UserComponent } from './user.component';
import {
    UserVisitComponent,
    UserVisitDetailComponent,
    UserVisitDetailResolve,
    UserVisitListComponent,
    UserVisitListResolve,
    UserVisitService
} from './visit';

@NgModule({
    imports: [
        CommonModule,
        DirectivesModule,
        FlexLayoutModule,
        FormsModule,
        PipesModule,
        ReactiveFormsModule,
        SharedModule,
        UserRoutingModule
    ],
    declarations: [
        UserComponent,
        UserDetailComponent,
        UserListComponent,
        UserSummaryComponent,
        UserVisitComponent,
        UserVisitDetailComponent,
        UserVisitListComponent
    ],
    providers: [
        UserDetailResolve,
        UserVisitDetailResolve,
        UserVisitListResolve,
        UserVisitService
    ],
})
export class UserModule {
}
