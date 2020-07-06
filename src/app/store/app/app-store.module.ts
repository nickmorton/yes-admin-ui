import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppEffects } from './app.effects';
import { appReducer } from './app.reducer';
import { APP_FEATURE_NAME } from './app.state';

@NgModule({
    imports: [StoreModule.forFeature(APP_FEATURE_NAME, appReducer), EffectsModule.forFeature([AppEffects])]
})
export class AppStoreModule { }
