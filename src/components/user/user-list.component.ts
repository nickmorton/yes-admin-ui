import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BaseComponent } from '../../lib';
import { UserService } from './user.service';
import { IUser, TEntitySort } from '@nickmorton/yes-admin-common';

const PAGE_SIZE = 10;

@Component({
	selector: 'app-user-list',
	templateUrl: 'user-list.template.html',
})
export class UserListComponent extends BaseComponent implements OnInit {
	public users$: Observable<IUser[]>;
	public tableColumns = ['userName', 'gender', 'dob', 'lastVisited'];
	private filterNames = new BehaviorSubject<string>('');

	constructor(private router: Router, private userService: UserService) {
		super();
	}

	public ngOnInit() {
		this.users$ = this.filterNames.pipe(
			debounceTime(500),
			distinctUntilChanged(),
			switchMap(name => {
				const sort: TEntitySort<IUser> = name ? { surname: 1, forename: 1 } : { lastUpdated: -1 };
				return this.userService
					.get({ name, skip: 0, limit: PAGE_SIZE, sort })
					.pipe(map(r => r.entities));
			})
		);
	}

	public filter(name: string) {
		this.filterNames.next(name);
	}

	public view = (user: IUser): boolean => {
		this.router.navigate(['/users', user._id]);
		return false;
	}
}
