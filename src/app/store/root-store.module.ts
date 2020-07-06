import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppStoreModule } from './app/app-store.module';
import { UserStoreModule } from './user/user-store.module';

@NgModule({
    imports: [StoreModule.forRoot({}), EffectsModule.forRoot(), AppStoreModule, UserStoreModule]
})
export class RootStoreModule { }
