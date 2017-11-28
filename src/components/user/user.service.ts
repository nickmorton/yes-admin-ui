import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/rx';

import {
	EmploymentStatusCode,
	EthnicityCode,
	FamilySupportCode,
	HousingStatusCode,
	IPagedRequest,
	IPagedResponse,
	IRequest,
	IResponse,
	IUser,
	IUserGetRequest,
	JobSearchFrequencyCode
} from '@nickmorton/yes-admin-common';

@Injectable()
export class UserService {
	constructor(private http: Http) {
	}

	public get = (request: IUserGetRequest): Observable<IPagedResponse<IUser>> => {
		const searchParams: URLSearchParams = new URLSearchParams();
		Object.keys(request).forEach((paramName: string) => searchParams.append(paramName, request[paramName]));

		return this.http.get('/api/users', { search: searchParams })
			.map((httpResponse: Response) => httpResponse.json() as IPagedResponse<IUser>);
	}

	public getById = (id: string): Observable<IResponse<IUser>> => {
		return this.http.get(`/api/users/${id}`)
			.map((res: Response) => res.json());
	}

	public add = (request: IRequest<IUser>): Observable<IResponse<IUser>> => {
		return this.http.post('api/users', request)
			.map((res: Response) => res.json() as IResponse<IUser>);
	}

	public update = (request: IRequest<IUser>): Observable<IResponse<IUser>> => {
		return this.http.put('api/users', request)
			.map((res: Response) => res.json() as IResponse<IUser>);
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
