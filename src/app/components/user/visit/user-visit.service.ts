import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
	ContactTypeCode,
	EmploymentStatusCode,
	FamilySupportCode,
	HousingStatusCode,
	IPagedResponse,
	IRequest,
	IResponse,
	IssueCode,
	IUserVisit,
	IUserVisitsGetRequest,
	JobSearchFrequencyCode,
	VisitTimeCode
} from '@nickmorton/yes-admin-common';

import { buildHttpParams } from '../../../lib';

@Injectable()
export class UserVisitService {
	constructor(private http: HttpClient) {
	}

	get(request: IUserVisitsGetRequest): Observable<IPagedResponse<IUserVisit>> {
		const params = buildHttpParams(request, 'limit', 'skip', 'sort');
		return this.http.get<IPagedResponse<IUserVisit>>(`/api/users/${request.userId}/visits`, { params });
	}

	getById(visitId: string): Observable<IResponse<IUserVisit>> {
		return this.http.get<IResponse<IUserVisit>>(`/api/visits/${visitId}`);
	}

	add(request: IRequest<IUserVisit>): Observable<IResponse<IUserVisit>> {
		return this.http.post<IResponse<IUserVisit>>(`api/users/${request.data._userId}/visits`, request);
	}

	update(request: IRequest<IUserVisit>): Observable<IResponse<IUserVisit>> {
		return this.http.put<IResponse<IUserVisit>>(`api/visits/${request.data._id}`, request);
	}

	getLatest(userId: string): Observable<IResponse<IUserVisit>> {
		return this.http.get<IResponse<IUserVisit>>(`/api/users/${userId}/visits/latest`);
	}

	create(userId: string): Observable<IUserVisit> {
		return this.getLatest(userId).pipe(map(response => {
			if (response && response.entity) {
				return {
					...response.entity,
					_id: undefined,
					date: new Date(),
				};
			} else {
				return {
					_userId: userId,
					contactType: ContactTypeCode['In person'],
					crisisSupport: [],
					date: new Date(),
					employmentStatus: EmploymentStatusCode.unknown,
					familySupport: FamilySupportCode.unknown,
					housingStatus: HousingStatusCode.unknown,
					issue: IssueCode.unknown,
					hasCurrentCV: false,
					hasSkillsToFindJob: false,
					isSearchingForJob: true,
					jobInterviewsInLastMonth: 0,
					jobSearchFrequency: JobSearchFrequencyCode.unknown,
					visitTime: VisitTimeCode.AM,
					wasByAppointment: false,
				} as IUserVisit;
			}
		}));
	}
}
