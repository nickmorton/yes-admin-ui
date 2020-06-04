import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export class BaseComponent implements OnDestroy {
	private readonly _rootSubscription = new Subscription();

	protected addForDisposal = (...subscriptions: Subscription[]) => {
		subscriptions.forEach(s => this._rootSubscription.add(s));
	}

	ngOnDestroy() {
		this._rootSubscription.unsubscribe();
	}
}
