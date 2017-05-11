import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
 
import { AuthenticationService } from '../_services/authentication.service';
import { Employee } from '../_models/employee.model';
 
@Injectable()
export class EmployeeService {
    handleError: any;
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }
 
    get(searchStr: string = '', orderBy: string = '', sort: string = ''): Observable<Employee[]> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
 
        // get users from api
        return this.http.get('/api/employees?search='+searchStr+'&orderby='+orderBy+'&sort='+sort, options)
            .map((response: Response) => response.json());
    }

    getSingle(id: number): Observable<Employee[]> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
 
        // get users from api
        return this.http.get('/api/employees/'+id, options)
            .map((response: Response) => response.json());
    }

    create(employee: Employee) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
 
        return this.http.post('/api/employees', employee,  options);
    }

    delete(id: number){
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete('/api/employees/'+id, options);
    }
}