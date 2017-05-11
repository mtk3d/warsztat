import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
 
import { AuthenticationService } from '../_services/authentication.service';
import { Document } from '../_models/document.model';
 
@Injectable()
export class DocumentService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }
 
    getDocuments(type: string = '', from: string = '', to: string = '', search: string = '', orderBy: string = '', sorting: string = ''): Observable<Document[]> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        // get users from api
        return this.http.get('/api/documents?type='+type+'&from='+from+'&to='+to+'&search='+search+'&order_by='+orderBy+'&sorting='+sorting, options)
            .map((response: Response) => response.json());
    }

    getDocument(id: number): Observable<Document[]> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
 
        // get users from api
        return this.http.get('/api/documents/'+id, options)
            .map((response: Response) => response.json());
    }

    create(document: Document) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
 
        return this.http.post('/api/documents', document,  options);
    }

    deleteDocument(id: number){
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete('/api/documents/'+id, options);
    }
}