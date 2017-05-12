import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
 
import { AuthenticationService } from '../_services/authentication.service';
import { DocumentPosition } from '../_models/documentPosition.model';
 
@Injectable()
export class DocumentPositionService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }

    getDocumentPositions(id): Observable<DocumentPosition[]> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
 
        // get users from api
        return this.http.get('http://localhost:8000/documentpositions/'+id+'/document', options)
            .map((response: Response) => response.json());
    }

    create(documentPosition: DocumentPosition) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
 
        return this.http.post('http://localhost:8000/documentpositions', documentPosition,  options);
    }

    update(documentPosition: DocumentPosition, id) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
 
        return this.http.put('http://localhost:8000/documentpositions/'+id, documentPosition,  options);
    }

    delete(id: number){
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete('http://localhost:8000/documentpositions/'+id, options);
    }

}