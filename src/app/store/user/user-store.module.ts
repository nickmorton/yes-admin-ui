import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserEffects } from './user.effects';
import { userReducer } from './user.reducer';
import { USER_FEATURE_NAME } from './user.state';

@NgModule({
    imports: [
        StoreModule.forFeature(USER_FEATURE_NAME, userReducer),
        EffectsModule.forFeature([UserEffects])
    ]
})
export class UserStoreModule { }
