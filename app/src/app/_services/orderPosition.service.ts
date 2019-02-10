import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map'

import { AuthenticationService } from '../_services/authentication.service';
import { OrderPosition } from '../_models/orderPosition.model';

@Injectable()
export class OrderPositionService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {}

    getOrderPositions(id): Observable < OrderPosition[] > {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        // get users from api
        return this.http.get(environment.apiEndpoint + 'serviceorderpositions/' + id + '/order', options)
            .map((response: Response) => response.json());
    }

    create(orderPosition: OrderPosition) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(environment.apiEndpoint + 'serviceorderpositions', orderPosition, options);
    }

    update(orderPosition: OrderPosition, id) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(environment.apiEndpoint + 'serviceorderpositions/' + id, orderPosition, options);
    }

    delete(id: number) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(environment.apiEndpoint + 'serviceorderpositions/' + id, options);
    }

}
