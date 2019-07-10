import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser, TEntitySort } from '@nickmorton/yes-admin-common';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { BaseComponent } from '../../lib';
import { UserService } from './user.service';

const PAGE_SIZE = 10;
const NAME_QUERY_PARAM_KEY = 'filter';

@Component({
	selector: 'app-user-list',
	templateUrl: 'user-list.template.html',
	styleUrls: ['user-list.style.scss']
})
export class UserListComponent extends BaseComponent implements OnInit {
	users$: Observable<IUser[]>;
	tableColumns = ['userName', 'gender', 'dob', 'lastVisited', 'actions'];
	nameFilter = null;
	private nameFilterSubject = new BehaviorSubject<string>('');

	constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {
		super();
	}

	ngOnInit() {
		this.addForDisposal(
			this.nameFilterSubject
				.pipe(
					debounceTime(500),
					distinctUntilChanged()
				)
				.subscribe(filter => this.router.navigate([], {relativeTo: this.route, queryParams: { filter } }))
		);

		this.users$ = this.route.queryParamMap.pipe(
			switchMap(params => {
				const filter = params.get(NAME_QUERY_PARAM_KEY);
				if (filter !== this.nameFilter) {
					this.nameFilter = filter;
				}
				const sort: TEntitySort<IUser> = filter ? { surname: 1, forename: 1 } : { lastUpdated: -1 };
				return this.userService
					.get({ name: filter, skip: 0, limit: PAGE_SIZE, sort })
					.pipe(map(r => r.entities));
			}));

		const queryParamMap = this.route.snapshot.queryParamMap;
		if (queryParamMap.has(NAME_QUERY_PARAM_KEY)) {
			const nameFilterValue = queryParamMap.get(NAME_QUERY_PARAM_KEY);
			this.onNameFilterChange(nameFilterValue);
			this.nameFilter = nameFilterValue;
		}
	}

	onNameFilterChange(filter: string) {
		this.nameFilterSubject.next(filter);
	}

	viewUser(user: IUser) {
		this.router.navigate([user._id], { relativeTo: this.route, queryParams: { ret: this.router.url } });
		return false;
	}

	viewVisits(user: IUser) {
		this.router.navigate([user._id, 'visits'], { relativeTo: this.route, queryParams: { ret: this.router.url } });
		return false;
	}

	viewLatestVisit(user: IUser) {
		this.router.navigate([user._id, 'visits', 'latest'], { relativeTo: this.route, queryParams: { ret: this.router.url } });
		return false;
	}

	addVisit(user: IUser) {
		this.router.navigate([user._id, 'visits', 'add'], { relativeTo: this.route, queryParams: { ret: this.router.url } });
		return false;
	}
}
