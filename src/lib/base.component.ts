import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export class BaseComponent implements OnDestroy {
	private disposables: Array<Subscription> = [];

	protected addForDisposal = (...subscriptions: Subscription[]) => {
		this.disposables.push(...subscriptions);
	}

	public ngOnDestroy() {
		this.disposables
			.filter(s => s && !s.closed && s.unsubscribe)
			.forEach(s => s.unsubscribe());
	}
}
