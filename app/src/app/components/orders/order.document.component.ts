import { Component, OnInit, OnDestroy, Input, OnChanges, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { OrderService } from '../../_services/order.service';
import { OrderPositionService } from '../../_services/orderPosition.service';
import { OrderPosition } from '../../_models/orderPosition.model';
import { DocumentService } from '../../_services/document.service';
import { Document } from '../../_models/document.model';
import { DocumentPositionService } from '../../_services/documentPosition.service';
import { DocumentPosition } from '../../_models/documentPosition.model';
import { BreadcrumbsService } from '../../_services/breadcrumbs.service';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'order-document',
    templateUrl: 'order.document.component.html'
})
export class OrderDocumentComponent implements OnInit, OnDestroy, OnChanges, AfterViewChecked {

    id: number;
    document: any = {};
    consumerId: number;
    documentId: number;
    orderPositions: OrderPosition[] = [];
    inputPosition: any = {};
    queueArray: any = [];
    loading: boolean = false;
    private sub: any;

    constructor(
        private route: ActivatedRoute,
        private orderService: OrderService,
        private orderPositionService: OrderPositionService,
        private documentService: DocumentService,
        private documentPositionService: DocumentPositionService,
        private breadcrumbsService: BreadcrumbsService,
        private router: Router
    ) {}

    ngOnInit() {
        this.breadcrumbsService.sendBreadcrumbs([
            { 'path': '/', 'text': 'Warsztat', 'active': true },
            { 'path': '/orders', 'text': 'Zlecenia', 'active': true },
            { 'path': '', 'text': 'Utwórz dokument', 'active': false }
        ]);

        $('.ui.checkbox').checkbox();
        $('.ui.dropdown').dropdown();

        let today = new Date();
        this.document['date'] = today.toISOString();
        this.document['dateOfPayment'] = today.toISOString();
        this.document['paid'] = false;

        this.getOrder();
    }

    getOrder() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];

            this.orderService.getOrder(this.id)
                .subscribe(order => {
                    this.document['consumerId'] = order['consumerId'];
                    this.consumerId = order['consumerId'];
                });

            this.orderPositionService.getOrderPositions(this.id)
                .subscribe(orderPositions => {
                    this.orderPositions = orderPositions;
                });

        });
    }

    type(type) {
        this.document['type'] = type;
    }

    paymentMethod(type) {
        this.document['paymentMethod'] = type;
    }

    add() {
        this.loading = true;
        this.sub = this.documentService.create(this.document)
            .subscribe(resp => {
                this.documentId = resp['id'];
                this.copyPositions(resp['id'])
                this.sub.unsubscribe();
            });
    }

    copyPositions(id) {
        let quantity = this.orderPositions.length;
        if (quantity > 0) {
            for (let i = 0; i < quantity; i++) {
                this.addDocumentPosition(i, id, this.orderPositions[i]);
            }

            Observable.forkJoin(this.queueArray).subscribe((ok) => { this.router.navigate(['/documents/' + this.documentId]); });
        }else{
            this.router.navigate(['/documents/' + this.documentId]);
        }
    }

    addDocumentPosition(i, id, position) {
        position['service'] = 1;
        position['itemId'] = position['serviceId'];
        position['documentId'] = id;

        this.queueArray[i] = this.documentPositionService.create(position);
    }

    setConsumerId(consumerId) {
        this.document['consumerId'] = consumerId;
    }

    ngOnChanges() {}

    ngAfterViewChecked() {

    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
