import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
    EthnicityCode,
    IPagedResponse,
    IRequest,
    IResponse,
    IUser,
    IUserGetRequest,
} from '@nickmorton/yes-admin-common';
import { buildHttpParams } from '../lib';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private readonly http: HttpClient) {
    }

    get(request: IUserGetRequest) {
        const params = buildHttpParams(request, 'limit', 'name', 'skip', 'sort');
        return this.http.get<IPagedResponse<IUser>>('/api/users', { params });
    }

    getById(userId: string) {
        return this.http.get<IResponse<IUser>>(`/api/users/${userId}`);
    }

    add(request: IRequest<IUser>) {
        return this.http.post<IResponse<IUser>>('api/users', request);
    }

    update(userId: string, request: IRequest<IUser>) {
        return this.http.put<IResponse<IUser>>(`api/users/${userId}`, request);
    }

    create(): IUser {
        return {
            ethnicity: EthnicityCode.unknown,
            forename: null,
            gender: 'Female',
            isDobApproximate: true,
            surname: null
        } as IUser;
    }
}
