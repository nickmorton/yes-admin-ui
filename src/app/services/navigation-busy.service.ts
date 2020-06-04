import { Injectable, OnDestroy } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { SpinnerService } from './spinner.service';

@Injectable({ providedIn: 'root' })
export class NavigationBusyService implements OnDestroy {
	private readonly _rootSubscription = new Subscription();

	constructor(spinnerService: SpinnerService, router: Router) {
		this._rootSubscription.add(
			router.events
				.pipe(
					filter(
						event => event instanceof NavigationStart
							|| event instanceof NavigationCancel
							|| event instanceof NavigationEnd
							|| event instanceof NavigationError
					)
				)
				.subscribe(event => event instanceof NavigationStart ? spinnerService.show() : spinnerService.hide())
		);
	}

	ngOnDestroy() {
		this._rootSubscription.unsubscribe();
	}
}
