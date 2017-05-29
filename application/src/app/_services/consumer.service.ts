import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { ApiSettings } from '../_settings/api.settings';
import 'rxjs/add/operator/map'

import { AuthenticationService } from '../_services/authentication.service';
import { Consumer } from '../_models/consumer.model';

@Injectable()
export class ConsumerService {
    handleError: any;
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {}

    getConsumers(searchStr: string = '', orderBy: string = '', sort: string = ''): Observable < Consumer[] > {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        // get users from api
        return this.http.get(ApiSettings.API_ENDPOINT + 'consumers?search=' + searchStr + '&orderby=' + orderBy + '&sort=' + sort, options)
            .map((response: Response) => response.json());
    }

    getConsumer(id: number): Observable < Consumer[] > {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        // get users from api
        return this.http.get(ApiSettings.API_ENDPOINT + 'consumers/' + id, options)
            .map((response: Response) => response.json());
    }

    create(consumer: Consumer) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(ApiSettings.API_ENDPOINT + 'consumers', consumer, options)
            .map((response: Response) => response.json());
    }

    update(id: number, consumer: Consumer) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(ApiSettings.API_ENDPOINT + 'consumers/' + id, consumer, options);
    }

    delete(id: number) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(ApiSettings.API_ENDPOINT + 'consumers/' + id, options);
    }
}
