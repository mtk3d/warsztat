import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
 
import { AuthenticationService } from '../_services/authentication.service';
import { Service } from '../_models/service.model';
 
@Injectable()
export class ServiceService {
    handleError: any;
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }
 
    get(searchStr: string = '', orderBy: string = '', sort: string = ''): Observable<Service[]> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
 
        // get users from api
        return this.http.get('/api/services?search='+searchStr+'&orderby='+orderBy+'&sort='+sort, options)
            .map((response: Response) => response.json());
    }

    getSingle(id: number): Observable<Service[]> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
 
        // get users from api
        return this.http.get('/api/services/'+id, options)
            .map((response: Response) => response.json());
    }

    create(consumer: Service) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
 
        return this.http.post('/api/services', consumer,  options);
    }

    delete(id: number){
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete('/api/services/'+id, options);
    }
}