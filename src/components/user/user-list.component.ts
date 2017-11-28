import { Component, ElementRef, Injectable, OnInit } from '@angular/core';
import { Router, Resolve, ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
import { Subject } from 'rxjs/Subject';
import { BaseComponent } from '../../lib';
import { UserService } from './user.service';
import { IPagedResponse, IUser } from '@nickmorton/yes-admin-common';

interface IUserListData {
	users: Array<IUser>;
}

@Component({
	selector: 'app-user-list',
	templateUrl: 'user-list.template.html',
})
export class UserListComponent extends BaseComponent implements OnInit {
	public users$: Observable<IUser[]>;
	private filterNames = new Subject<string>();

	constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) {
		super();
	}

	public ngOnInit() {
		// // this.route.data.subscribe(
		// // 	(result: { data: IUserListData }) => {
		// // 		this.users = [...result.data.users];
		// // 	},
		// // );
		this.users$ = this.filterNames.pipe(
			debounceTime(300),
			distinctUntilChanged(),
			switchMap(name => this.userService.get({ name, skip: 0, limit: 1000 }).map(r => r.entities))
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

@Injectable()
export class UserListResolve implements Resolve<IUserListData> {
	constructor(private userService: UserService) {
	}

	public resolve(): Observable<IUserListData> {
		return this.userService.get({ skip: 0, limit: 10000 })
			.map((response: IPagedResponse<IUser>) => <IUserListData>{ users: response.entities });
	}
}
