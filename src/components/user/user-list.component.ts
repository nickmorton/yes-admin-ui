import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser, TEntitySort } from '@nickmorton/yes-admin-common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { BaseComponent } from '../../lib';
import { UserService } from './user.service';

const PAGE_SIZE = 10;
const NAME_QUERY_PARAM_KEY = 'name';

@Component({
	selector: 'app-user-list',
	templateUrl: 'user-list.template.html',
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
				.subscribe(name => this.router.navigate(['/users'], { queryParams: { name } }))
		);

		this.users$ = this.route.queryParamMap.pipe(
			switchMap(params => {
				const name = params.get(NAME_QUERY_PARAM_KEY);
				if (name !== this.nameFilter) {
					this.nameFilter = name;
				}
				const sort: TEntitySort<IUser> = name ? { surname: 1, forename: 1 } : { lastUpdated: -1 };
				return this.userService
					.get({ name, skip: 0, limit: PAGE_SIZE, sort })
					.pipe(map(r => r.entities));
			})
		);

		const queryParamMap = this.route.snapshot.queryParamMap;
		if (queryParamMap.has(NAME_QUERY_PARAM_KEY)) {
			const nameFilterValue = queryParamMap.get(NAME_QUERY_PARAM_KEY);
			this.onNameFilterChange(nameFilterValue);
			this.nameFilter = nameFilterValue;
		}
	}

	public onNameFilterChange(name: string) {
		this.nameFilterSubject.next(name);
	}

	public viewUser = (user: IUser): boolean => {
		this.router.navigate(['/users', user._id], { queryParams: { ret: this.router.url } });
		return false;
	}
}
