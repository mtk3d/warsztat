import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { ConsumerService } from '../../_services/consumer.service';
import { Consumer } from '../../_models/consumer.model';
import { BreadcrumbsService } from '../../_services/breadcrumbs.service';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'consumer-add',
    templateUrl: 'consumer.add.component.html'
})
export class ConsumerAddComponent implements OnInit, OnDestroy, OnChanges {

    id: number;
    consumer: any = {};
    dataAlert: boolean = false;
    addLoading: boolean = false;
    private sub: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private consumerService: ConsumerService,
        private breadcrumbsService: BreadcrumbsService
    ) {}

    ngOnInit() {
        this.breadcrumbsService.sendBreadcrumbs([
            { 'path': '/', 'text': 'Warsztat', 'active': true },
            { 'path': '/consumers', 'text': 'Klienci', 'active': true },
            { 'path': '', 'text': 'Dodaj', 'active': false }
        ]);
    }

    add() {
        this.addLoading = true;

        this.sub = this.consumerService.create(this.consumer)
            .subscribe(resp => {
                this.router.navigate(['/consumers/' + resp['id']]);
                this.sub.unsubscribe();
            });
    }

    showDataAlert() {
        return this.dataAlert;
    }

    closeDataAlert() {
        this.dataAlert = false;
    }

    ngOnChanges() {}

    ngOnDestroy() {}

}
