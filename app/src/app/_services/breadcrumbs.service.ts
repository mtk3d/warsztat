import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BreadcrumbsService {
    private subject = new Subject < any > ();

    sendBreadcrumbs(breadcrumbs: any) {
        this.subject.next(breadcrumbs);
    }

    clearBreadcrumbs() {
        this.subject.next();
    }

    getBreadcrumbs(): Observable < any > {
        return this.subject.asObservable();
    }
}
