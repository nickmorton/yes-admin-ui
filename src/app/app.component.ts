import { Component } from '@angular/core';
import { NavigationBusyService } from './services';

@Component({
    selector: 'yes-admin',
    styleUrls: ['app.component.scss'],
    templateUrl: 'app.component.html',
})
export class AppComponent {
    constructor(_: NavigationBusyService) {
        console.log('App component initialised');
    }
}
