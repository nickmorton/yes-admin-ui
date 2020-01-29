import { ModuleWithProviders, NgModule } from '@angular/core';

import { AuthenticationService } from './authentication.service';
import { NavigationBusyService } from './navigation-busy.service';
import { SpinnerService } from './spinner.service';
import { UserMessageService } from './user-message.service';

@NgModule({
})
export class ServicesModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: ServicesModule,
			providers: [
				AuthenticationService,
				NavigationBusyService,
				SpinnerService,
				UserMessageService
			],
		};
	}
}
