import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/subscription';

export class BaseComponent implements OnDestroy {
	private disposables: Array<Subscription> = [];

	public addForDisposal = (subscription: Subscription) => {
		this.disposables.push(subscription);
	}

	public ngOnDestroy() {
		this.disposables.forEach((s: Subscription) => s.unsubscribe);
	}
}
