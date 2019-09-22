import { ModuleWithProviders, NgModule } from '@angular/core';

import { UserMessageService } from './user-message.service';

@NgModule({
})
export class ServicesModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: ServicesModule,
            providers: [
                UserMessageService
            ],
        };
    }
}
