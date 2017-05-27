import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
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
        return this.http.get('http://localhost:8000/serviceorderpositions/' + id + '/order', options)
            .map((response: Response) => response.json());
    }

    create(orderPosition: OrderPosition) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('http://localhost:8000/serviceorderpositions', orderPosition, options);
    }

    update(orderPosition: OrderPosition, id) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.put('http://localhost:8000/serviceorderpositions/' + id, orderPosition, options);
    }

    delete(id: number) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete('http://localhost:8000/serviceorderpositions/' + id, options);
    }

}
