import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { IUser, TEntitySort } from '@nickmorton/yes-admin-common';
import { BaseComponent } from '@yes/lib';
import { selectAllUsers, userActions } from '@yes/store/user';

const PAGE_SIZE = 10;
const NAME_QUERY_PARAM_KEY = 'filter';

@Component({
    selector: 'yes-user-list',
    templateUrl: 'user-list.component.html',
    styleUrls: ['user-list.component.scss']
})
export class UserListComponent extends BaseComponent implements OnInit {
    readonly users$: Observable<IUser[]>;
    readonly tableColumns = ['userName', 'gender', 'dob', 'lastVisited', 'actions'];
    nameFilter: string = null;
    private readonly nameFilterSubject = new BehaviorSubject<string>('');

    constructor(
        private readonly store: Store,
        private readonly route: ActivatedRoute,
        private readonly router: Router
    ) {
        super();
        this.users$ = this.store.pipe(select(selectAllUsers));
    }

    ngOnInit() {
        this.addForDisposal(
            this.nameFilterSubject
                .pipe(
                    debounceTime(500),
                    distinctUntilChanged()
                )
                .subscribe(filter => this.router.navigate([], { relativeTo: this.route, queryParams: { filter } })),
            this.route.queryParamMap.pipe(
                map(params => params.get(NAME_QUERY_PARAM_KEY)),
                distinctUntilChanged()
            ).subscribe(filter => {
                if (filter !== this.nameFilter) {
                    this.nameFilter = filter;
                }
                const sort: TEntitySort<IUser> = filter ? { surname: 1, forename: 1 } : { lastUpdated: -1 };
                this.store.dispatch(userActions.getUsers({ limit: PAGE_SIZE, name: filter, sort }));
            })

        );

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
