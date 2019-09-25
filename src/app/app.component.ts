import { Component } from '@angular/core';
import { NavigationBusyService } from '../services';

@Component({
	selector: 'app-yes-admin',
	styleUrls: ['app.style.scss'],
	templateUrl: 'app.template.html',
})
export class AppComponent {
	constructor(_: NavigationBusyService) {
		console.log('App component initialised');
	}
}
