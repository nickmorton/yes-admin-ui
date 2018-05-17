import { Component, Input } from '@angular/core';
import { IUser } from '@nickmorton/yes-admin-common';

@Component({
	selector: 'app-user-summary',
	templateUrl: 'user-summary.template.html',
})
export class UserSummaryComponent {
	@Input() user: IUser;
}
