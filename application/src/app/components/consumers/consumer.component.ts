import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

import { ConsumerService } from '../../_services/consumer.service';
import { Consumer } from '../../_models/consumer.model';
import { DocumentService } from '../../_services/document.service';
import { Order } from '../../_models/order.model';
import { OrderService } from '../../_services/order.service';
import { Vehicle } from '../../_models/vehicle.model';
import { VehicleService } from '../../_services/vehicle.service';
import { Document } from '../../_models/document.model';
import { BreadcrumbsService } from '../../_services/breadcrumbs.service';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'consumer',
    templateUrl: 'consumer.component.html'
})
export class ConsumerComponent implements OnInit, OnDestroy, AfterViewInit {

    id: number;
    consumer: Consumer[] = [];
    documents: Document[] = [];
    orders: Order[] = [];
    vehicles: Vehicle[] = [];
    tab: string = 'documents';
    private sub: any;
    returnDocuments: boolean = false;
    returnOrders: boolean = false;
    returnVehicles: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private consumerService: ConsumerService,
        private documentService: DocumentService,
        private orderService: OrderService,
        private vehicleService: VehicleService,
        private breadcrumbsService: BreadcrumbsService
    ) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number

            this.consumerService.getConsumer(this.id)
                .subscribe(consumer => {
                    this.consumer = consumer;
                    //this.documentDataLoading = false;
                    this.breadcrumbsService.sendBreadcrumbs([
                        { 'path': '/', 'text': 'Warsztat', 'active': true },
                        { 'path': '/consumers', 'text': 'Klienci', 'active': true },
                        { 'path': '', 'text': consumer['name'], 'active': false }
                    ]);
                });
        });
        this.getDocuments();
        this.getOrders();
        this.getVehicles();
    }

    getDocuments() {
        this.sub = this.documentService.getDocumentsForConsumer(this.id)
            .subscribe(documents => {
                    this.documents = documents;
                    this.returnDocuments = true;
            });
    }

    getOrders() {
        this.sub = this.orderService.getOrdersForConsumer(this.id)
            .subscribe(orders => {
                    this.orders = orders;
                    this.returnOrders = true;
            });
    }

    getVehicles() {
        this.sub = this.vehicleService.getForConsumer(this.id)
            .subscribe(vehicles => {
                    this.vehicles = vehicles;
                    this.returnVehicles = true;
            });
    }

    ngAfterViewInit() {}

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
