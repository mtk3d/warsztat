import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { ApiSettings } from '../_settings/api.settings';
import 'rxjs/add/operator/map'

import { AuthenticationService } from '../_services/authentication.service';
import { Order } from '../_models/order.model';

@Injectable()
export class OrderService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {}

    getDocuments(from: string = '', to: string = '', search: string = '', orderBy: string = '', sorting: string = ''): Observable < Order[] > {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        // get users from api
        return this.http.get(ApiSettings.API_ENDPOINT + 'serviceorders?from=' + from + '&to=' + to + '&search=' + search + '&order_by=' + orderBy + '&sorting=' + sorting, options)
            .map((response: Response) => response.json());
    }

    getOrder(id: number): Observable < Order[] > {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        // get users from api
        return this.http.get(ApiSettings.API_ENDPOINT + 'serviceorders/' + id, options)
            .map((response: Response) => response.json());
    }

    getOrdersForConsumer(id: number): Observable < Order[] > {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        // get users from api
        return this.http.get(ApiSettings.API_ENDPOINT + 'serviceorders/' + id + '/consumer', options)
            .map((response: Response) => response.json());
    }

    update(document, id) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(ApiSettings.API_ENDPOINT + 'serviceorders/' + id, document, options);
    }

    patch(document, id) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.patch(ApiSettings.API_ENDPOINT + 'serviceorders/' + id, document, options);
    }

    create(document: Document) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(ApiSettings.API_ENDPOINT + 'serviceorders', document, options)
            .map((response: Response) => response.json());
    }

    delete(id: number) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(ApiSettings.API_ENDPOINT + 'serviceorders/' + id, options);
    }
}
