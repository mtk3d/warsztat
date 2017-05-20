import { Component, OnInit } from '@angular/core';

import { BreadcrumbsService } from '../../_services/breadcrumbs.service';

@Component({
    moduleId: module.id,
    selector: 'settings',
    templateUrl: 'settings.component.html'
})
export class SettingsComponent implements OnInit {

    constructor(
        private breadcrumbsService: BreadcrumbsService
    ) {}

    ngOnInit() {
        this.breadcrumbsService.sendBreadcrumbs([
            { 'path': '/', 'text': 'Warsztat', 'active': true },
            { 'path': '', 'text': 'Ustawienia', 'active': false }
        ]);
    }

}
