import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiSettings } from './../common/api.settings';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }
    register(user: User) {
        return this.http.post(ApiSettings.API_USER_REGISTER_ENDPOINT, user);
    }
}
