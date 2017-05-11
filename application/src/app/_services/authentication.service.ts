import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
 
@Injectable()
export class AuthenticationService {
    public token: string;
 
    constructor(private http: Http) {

        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
 
    login(username: string, password: string): Observable<boolean> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('/api/login_check', JSON.stringify({ _username: username, _password: password }), options)
            .map(response => {
                if(response.status < 200 || response.status >= 300) {
                    return false;
                }else{
                    this.token = response.json() && response.json().token;
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: this.token }));
                    return true;
                }
            })
            .catch(() => Observable.of(false));
    }
 
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
    
}
