import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

import { OrderService } from '../../_services/order.service';
import { Order } from '../../_models/order.model';
import { BreadcrumbsService } from '../../_services/breadcrumbs.service';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'order',
    templateUrl: 'order.component.html'
})
export class OrderComponent implements OnInit, OnDestroy, AfterViewInit {

    id: number;
    consumerId: number;
    consumerPatch: any;
    order: Order[] = [];
    sub: any;

    constructor(
        private route: ActivatedRoute,
        private orderService: OrderService,
        private breadcrumbsService: BreadcrumbsService
    ) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];

            this.orderService.getOrder(this.id)
                .subscribe(order => {
                    this.order = order;
                    this.consumerId = order['consumerId'];
                    this.breadcrumbsService.sendBreadcrumbs([
                        { 'path': '/', 'text': 'Warsztat', 'active': true },
                        { 'path': '/orders', 'text': 'Zlecenia', 'active': true },
                        { 'path': '', 'text': 'Zlecenie '+order['id']+' - '+order['mark']+' '+order['model'], 'active': false }
                    ]);
                });
        });
    }

    setConsumerId(id) {
        this.consumerPatch['consumerId'] = id;
        this.sub = this.orderService.patch(this.consumerPatch, this.id)
            .subscribe((ok) => {
                this.sub.unsubscribe();
                this.consumerPatch['consumerId'] = null;
            });
    }

    searchOrders() {
        
    }

    ngAfterViewInit() {}

    ngOnDestroy() {
        //this.sub.unsubscribe();
    }

}
