import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationeGuard } from '../../lib/authentication.guard';
import { HomeComponent } from './home.component';

const routes: Routes = [
	{ path: 'home', component: HomeComponent, canActivate: [AuthenticationeGuard] }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class HomeRoutingModule { }
