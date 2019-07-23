import { NgModule } from '@angular/core';

// Members.
import { KeyPipe } from './key.pipe';
import { KeysPipe } from './keys.pipe';

@NgModule({
	declarations: [
		KeyPipe,
		KeysPipe,
	],
	exports: [
		KeyPipe,
		KeysPipe
	],
})
export class PipesModule {
}
