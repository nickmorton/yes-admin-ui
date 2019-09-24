// Import modules.
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import 'hammerjs';

import { SharedModule } from '../components/shared/shared.module';
import { LibModule } from '../lib/lib.module';

// Members.
import { HomeModule } from '../components/home/home.module';
import { UserModule } from '../components/user/user.module';
import { ServicesModule } from '../services/services.module';
import { AppComponent } from './app.component';
import { appRouting } from './app.routing';
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
		HttpClientModule,
		LibModule.forRoot(),
		RouterModule,
		ServicesModule.forRoot(),

		// App modules.
		appRouting,
		HomeModule,
		UserModule,
		SharedModule,
	],
})
export class AppModule {
}
