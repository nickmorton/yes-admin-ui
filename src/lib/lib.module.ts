import { NgModule, ModuleWithProviders } from '@angular/core';

import { NgValidatorFactory } from './ng-validator-factory';

@NgModule({
})
export class LibModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: LibModule,
			providers: [
				NgValidatorFactory,
			],
		};
	}
}
