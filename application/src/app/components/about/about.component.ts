import { Component, OnInit } from '@angular/core';

import { BreadcrumbsService } from '../../_services/breadcrumbs.service';

@Component({
    moduleId: module.id,
    selector: 'about',
    templateUrl: 'about.component.html'
})
export class AboutComponent implements OnInit {

    constructor(
        private breadcrumbsService: BreadcrumbsService
    ) {}

    ngOnInit() {
        this.breadcrumbsService.sendBreadcrumbs([
            { 'path': '/', 'text': 'Warsztat', 'active': true },
            { 'path': '', 'text': 'O projekcie', 'active': false }
        ]);
    }

}
