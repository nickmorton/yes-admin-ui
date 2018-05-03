import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/subscription';

export class BaseComponent implements OnDestroy {
	private disposables: Array<Subscription> = [];

	protected addForDisposal = (...subscriptions: Subscription[]) => {
		this.disposables.push(...subscriptions);
	}

	public ngOnDestroy() {
		this.disposables
			.filter(s => s && !s.closed)
			.forEach(s => s.unsubscribe);
	}
}
