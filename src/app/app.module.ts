// Import modules.
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AuthServiceConfig, SocialLoginModule } from 'angularx-social-login';

import { SharedModule } from './components/shared/shared.module';
import { LibModule } from './lib/lib.module';
import { getAuthServiceConfig } from './social-login-config';

// Members.
import { AuthenticationModule } from './components/authentication/authentication.module';
import { HomeModule } from './components/home/home.module';
import { UserModule } from './components/user/user.module';
import { ServicesModule } from './services/services.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
        SocialLoginModule,

        // App modules.
        HomeModule,
        AuthenticationModule,
        SharedModule,
        UserModule,
        AppRoutingModule
    ],
    providers: [
        {
            provide: AuthServiceConfig, useFactory: getAuthServiceConfig
        }]
})
export class AppModule {
}
