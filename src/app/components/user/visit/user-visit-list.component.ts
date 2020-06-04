import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { IUserVisit, VisitTimeCode } from '@nickmorton/yes-admin-common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseComponent } from '../../../lib';
import { UserMessageService } from '../../../services';
import { UserVisitService } from './user-visit.service';

export interface IUserVisitListData {
    visits: IUserVisit[];
}
@Component({
    selector: 'app-user-visit-list',
    templateUrl: 'user-visit-list.component.html',
    styleUrls: ['user-visit-list.component.scss']
})
export class UserVisitListComponent extends BaseComponent implements OnInit {
    visits: IUserVisit[];
    tableColumns = ['date', 'visitTime'];
    visitTimeCode: typeof VisitTimeCode = VisitTimeCode;

    constructor(private readonly route: ActivatedRoute, private readonly router: Router) {
        super();
    }

    ngOnInit() {
        this.route.data.subscribe((result: { data: IUserVisitListData }) => {
            this.visits = result.data.visits;
        });
    }

    viewVisit(visit: IUserVisit) {
        this.router.navigate([visit._id], { relativeTo: this.route });
        return false;
    }
}

@Injectable()
export class UserVisitListResolve implements Resolve<IUserVisitListData> {
    constructor(private userVisitsService: UserVisitService, private readonly userMessageService: UserMessageService) {
    }

    public resolve(route: ActivatedRouteSnapshot): Observable<IUserVisitListData> {
        const userId: string = route.paramMap.get('userId');
        return this.userVisitsService.get({ userId, limit: 0, skip: 0, sort: { lastUpdated: -1 } }).pipe(
            map(response => ({ visits: response.entities })),
            catchError(error => {
                this.userMessageService.serverError('get');
                return throwError(error);
            })
        );
    }
}
