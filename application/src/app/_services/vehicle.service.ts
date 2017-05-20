import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { AuthenticationService } from '../_services/authentication.service';
import { Vehicle } from '../_models/vehicle.model';

@Injectable()
export class VehicleService {
    handleError: any;
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {}

    getAll(searchStr: string = '', orderBy: string = '', sort: string = ''): Observable < Vehicle[] > {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        // get users from api
        return this.http.get('http://localhost:8000/vehicles?search=' + searchStr + '&orderby=' + orderBy + '&sort=' + sort, options)
            .map((response: Response) => response.json());
    }

    get(id: number): Observable < Vehicle[] > {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        // get users from api
        return this.http.get('http://localhost:8000/vehicles/' + id, options)
            .map((response: Response) => response.json());
    }

    create(vehicle: Vehicle) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('http://localhost:8000/vehicles', vehicle, options);
    }

    delete(id: number) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete('http://localhost:8000/vehicles/' + id, options);
    }
}
