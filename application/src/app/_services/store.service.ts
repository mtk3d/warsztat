import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { ApiSettings } from '../_settings/api.settings';
import 'rxjs/add/operator/map'

import { AuthenticationService } from '../_services/authentication.service';
import { Store } from '../_models/store.model';

@Injectable()
export class StoreService {
    handleError: any;
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {}

    get(searchStr: string = '', orderBy: string = '', sort: string = ''): Observable < Store[] > {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        // get users from api
        return this.http.get(ApiSettings.API_ENDPOINT + 'stores?search=' + searchStr + '&orderby=' + orderBy + '&sort=' + sort, options)
            .map((response: Response) => response.json());
    }

    getSingle(id: number): Observable < Store[] > {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        // get users from api
        return this.http.get(ApiSettings.API_ENDPOINT + 'stores/' + id, options)
            .map((response: Response) => response.json());
    }

    create(store: Store) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(ApiSettings.API_ENDPOINT + 'stores', store, options);
    }

    update(id: number, store: Store) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(ApiSettings.API_ENDPOINT + 'stores/' + id, store, options);
    }

    delete(id: number) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(ApiSettings.API_ENDPOINT + 'stores/' + id, options);
    }
}
