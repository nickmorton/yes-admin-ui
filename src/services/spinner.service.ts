import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatSpinner } from '@angular/material/progress-spinner';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
	private readonly _overlayRef: OverlayRef;
	private readonly _portal: ComponentPortal<MatSpinner>;

	constructor(overlay: Overlay) {
		this._overlayRef = overlay.create({
			hasBackdrop: true,
			backdropClass: 'dark-backdrop',
			positionStrategy: overlay.position()
				.global()
				.centerHorizontally()
				.centerVertically()
		});

		this._portal = new ComponentPortal(MatSpinner);
	}

	show() {
		if (!this._isSpinnerShowing) {
			this._overlayRef.attach(this._portal);
		}
	}

	hide() {
		if (this._isSpinnerShowing) {
			this._overlayRef.detach();
		}
	}

	private get _isSpinnerShowing() {
		return this._overlayRef.hasAttached();
	}
}
