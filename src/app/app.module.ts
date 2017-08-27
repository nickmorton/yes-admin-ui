// Import modules.
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import 'hammerjs';

import { SharedModule } from '../components/shared/shared.module';
import { LibModule } from '../lib/lib.module';

// Members.
import { appRouting } from './app.routing';
import { AppComponent } from './app.component';
import { HomeModule } from '../components/home/home.module';
import { UserModule } from '../components/user/user.module';
import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
	bootstrap: [AppComponent],
	declarations: [
		AppComponent,
		PageNotFoundComponent,
	],
	imports: [
		BrowserAnimationsModule,
		BrowserModule,
		CommonModule,
		FlexLayoutModule,
		HttpModule,
		LibModule.forRoot(),
		RouterModule,

		// App modules.
		appRouting,
		HomeModule,
		UserModule,
		SharedModule,
	],
})
export class AppModule {
}
