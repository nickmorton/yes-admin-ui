import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser, TEntitySort } from '@nickmorton/yes-admin-common';
import { BehaviorSubject ,  Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap ,  map } from 'rxjs/operators';
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
	public users$: Observable<IUser[]>;
	public tableColumns = ['userName', 'gender', 'dob', 'visitCount', 'lastVisited'];
	public nameFilter = null;
	private nameFilterSubject = new BehaviorSubject<string>('');

	constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {
		super();
	}

	public ngOnInit() {
		this.addForDisposal(
			this.nameFilterSubject
				.pipe(
					debounceTime(500),
					distinctUntilChanged()
				)
				.subscribe(filter => this.router.navigate(['/users'], { queryParams: { filter } }))
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

	public onNameFilterChange(filter: string) {
		this.nameFilterSubject.next(filter);
	}

	public viewUser(user: IUser) {
		this.router.navigate(['/users', user._id], { queryParams: { ret: this.router.url } });
		return false;
	}
}
