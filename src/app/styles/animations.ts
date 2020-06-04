import {
	animate,
	AnimationTriggerMetadata,
	state,
	style,
	transition,
	trigger,
} from '@angular/animations';

export const tansformSlideInOut: AnimationTriggerMetadata = trigger(
	'tansformSlideInOut',
	[
		state('in', style({ transform: 'translateX(0)' })),
		transition(':enter', [
			style({ transform: 'translateX(-100%)' }),
			animate(200)
		]),
		transition(':leave', [
			animate(200, style({ transform: 'translateX(100%)' }))
		])
	]
);
