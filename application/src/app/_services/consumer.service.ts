import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
 
import { AuthenticationService } from '../_services/authentication.service';
import { Consumer } from '../_models/consumer.model';
 
@Injectable()
export class ConsumerService {
    handleError: any;
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }
 
    getConsumers(searchStr: string = '', orderBy: string = '', sort: string = ''): Observable<Consumer[]> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
 
        // get users from api
        return this.http.get('http://localhost:8000/api/consumers?search='+searchStr+'&orderby='+orderBy+'&sort='+sort, options)
            .map((response: Response) => response.json());
    }

    getConsumer(id: number): Observable<Consumer[]> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
 
        // get users from api
        return this.http.get('http://localhost:8000/api/consumers/'+id, options)
            .map((response: Response) => response.json());
    }
}