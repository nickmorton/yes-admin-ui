import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/rx';

import {
	EmploymentStatusCode,
	EthnicityCode,
	FamilySupportCode,
	HousingStatusCode,
	IPagedResponse,
	IRequest,
	IResponse,
	IUser,
	IUserGetRequest,
	JobSearchFrequencyCode
} from '@nickmorton/yes-admin-common';

@Injectable()
export class UserService {
	constructor(private http: HttpClient) {
	}

	public get = (request: IUserGetRequest): Observable<IPagedResponse<IUser>> => {
		const searchParams = new HttpParams();
		Object.keys(request).forEach((paramName: string) => searchParams.append(paramName, request[paramName]));

		return this.http.get<IPagedResponse<IUser>>('/api/users', { params: searchParams });
	}

	public getById = (id: string): Observable<IResponse<IUser>> => {
		return this.http.get<IResponse<IUser>>(`/api/users/${id}`);
	}

	public add = (request: IRequest<IUser>): Observable<IResponse<IUser>> => {
		return this.http.post<IResponse<IUser>>('api/users', request);
	}

	public update = (request: IRequest<IUser>): Observable<IResponse<IUser>> => {
		return this.http.put<IResponse<IUser>>('api/users', request);
	}

	public create = (): IUser => {
		return {
			_id: null,
			crisisSupport: [],
			dob: null,
			employmentStatus: EmploymentStatusCode.unknown,
			ethnicity: EthnicityCode.unknown,
			familySupport: FamilySupportCode.unknown,
			forename: null,
			gender: 'Female',
			hasCurrentCV: false,
			hasSkillsToFindJob: false,
			housingStatus: HousingStatusCode.unknown,
			isDobApproximate: true,
			isSearchingForJob: false,
			jobInterviewsInLastMonth: 0,
			jobSearchFrequency: JobSearchFrequencyCode.unknown,
			surname: null,
			visits: [],
		} as IUser;
	}
}
