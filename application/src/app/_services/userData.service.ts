import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { ApiSettings } from '../_settings/api.settings';
import 'rxjs/add/operator/map'

import { AuthenticationService } from '../_services/authentication.service';
import { UserData } from '../_models/userData.model';

@Injectable()
export class UserDataService {
    handleError: any;
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {}

    get(): Observable < UserData[] > {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        // get users from api
        return this.http.get(ApiSettings.API_ENDPOINT + 'user', options)
            .map((response: Response) => response.json());
    }

    patch(user) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.patch(ApiSettings.API_ENDPOINT + 'user', user, options);
    }

    available(username: string) {
        let data = {"username": username};
        return this.http.post(ApiSettings.API_ENDPOINT + 'username_check', data)
            .map((response: Response) => response.json());
    }

    availableEmail(email: string) {
        let data = {"email": email};
        return this.http.post(ApiSettings.API_ENDPOINT + 'email_check', data)
            .map((response: Response) => response.json());
    }

    update(user: UserData) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(ApiSettings.API_ENDPOINT + 'user', user, options);
    }

    register(user: UserData) {
        return this.http.post(ApiSettings.API_ENDPOINT + 'registration', user);
    }

}
