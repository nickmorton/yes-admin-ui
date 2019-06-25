import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { IUserVisit } from '@nickmorton/yes-admin-common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseComponent } from '../../../lib';
import { UserVisitService } from './user-visit.service';

export interface IUserVisitListData {
	visits: IUserVisit[];
}
@Component({
	selector: 'app-user-visit-list',
	templateUrl: 'user-visit-list.template.html',
	styleUrls: ['user-visit-list.style.scss']
})
export class UserVisitListComponent extends BaseComponent implements OnInit {
	public visits: IUserVisit[];
	public tableColumns = ['date', 'visitTime'];

	constructor(private route: ActivatedRoute, private router: Router) {
		super();
	}

	public ngOnInit() {
		this.route.data.subscribe((result: { data: IUserVisitListData }) => {
			this.visits = result.data.visits;
		});
	}

	public viewVisit(visit: IUserVisit) {
		this.router.navigate([visit._id], { relativeTo: this.route });
		return false;
	}
}

@Injectable()
export class UserVisitListResolve implements Resolve<IUserVisitListData> {
	constructor(private userVisitsService: UserVisitService) {
	}

	public resolve(route: ActivatedRouteSnapshot): Observable<IUserVisitListData> {
		const userId: string = route.paramMap.get('userId');
		return this.userVisitsService.get({ userId, limit: -1, skip: 0, sort: { lastUpdated: -1 } }).pipe(
			map(response => <IUserVisitListData>{ visits: response.entities })
		);
	}
}
