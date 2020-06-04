import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { ErrorInterceptor } from './error.interceptor';
import { TokenInterceptor } from './token.interceptor';

import { NgValidatorFactory } from './ng-validator-factory';

@NgModule({
})
export class LibModule {
	public static forRoot(): ModuleWithProviders<LibModule> {
		return {
			ngModule: LibModule,
			providers: [
				NgValidatorFactory,
				{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
				{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
			],
		};
	}
}
