import { Component, ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import { Router, Resolve, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs/rx';
import { BaseComponent } from '../../lib';
import { UserService } from './user.service';
import { IPagedResponse, IUser } from '@nickmorton/yes-admin-common';

interface IUserListData {
	users: Array<IUser>;
}

@Component({
	selector: 'user-list',
	templateUrl: 'user-list.template.html',
})
export class UserListComponent extends BaseComponent implements OnInit {
	public users = new Subject<IUser[]>();

	@ViewChild('filter') filter: ElementRef;

	constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) {
		super();
	}

	public ngOnInit() {
		this.route.data.subscribe(
			(result: { data: IUserListData }) => {
				this.users.next(result.data.users);
			},
		);
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
