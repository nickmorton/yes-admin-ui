import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
	EthnicityCode,
	IPagedResponse,
	IRequest,
	IResponse,
	IUser,
	IUserGetRequest,
} from '@nickmorton/yes-admin-common';

import { buildHttpParams } from '../../lib';

@Injectable()
export class UserService {
	constructor(private http: HttpClient) {
	}

	public get(request: IUserGetRequest): Observable<IPagedResponse<IUser>> {
		const params = buildHttpParams(request, 'limit', 'name', 'skip', 'sort');
		return this.http.get<IPagedResponse<IUser>>('/api/users', { params });
	}

	public getById(userId: string): Observable<IResponse<IUser>> {
		return this.http.get<IResponse<IUser>>(`/api/users/${userId}`);
	}

	public add(request: IRequest<IUser>): Observable<IResponse<IUser>> {
		return this.http.post<IResponse<IUser>>('api/users', request);
	}

	public update(userId: string, request: IRequest<IUser>): Observable<IResponse<IUser>> {
		return this.http.put<IResponse<IUser>>(`api/users/${userId}`, request);
	}

	public create(): IUser {
		return {
			ethnicity: EthnicityCode.unknown,
			forename: null,
			gender: 'Female',
			isDobApproximate: true,
			surname: null
		} as IUser;
	}
}
