import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

import { OrderService } from '../../_services/order.service';
import { VehicleService } from '../../_services/vehicle.service';
import { Order } from '../../_models/order.model';
import { Vehicle } from '../../_models/vehicle.model';
import { BreadcrumbsService } from '../../_services/breadcrumbs.service';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'orders-add',
    templateUrl: 'orders.add.component.html'
})
export class OrdersAddComponent implements OnInit, OnDestroy, AfterViewInit {

    orderInput: any = [];
    vehicles: Vehicle[] = [];
    idIsSet: boolean = false;
    consumerHasVehicles: boolean = false;
    consumerId: number;
    private sub: any;

    constructor(
        private route: ActivatedRoute,
        private orderService: OrderService,
        private vehicleService: VehicleService,
        private breadcrumbsService: BreadcrumbsService
    ) {}

    ngOnInit() {
        this.breadcrumbsService.sendBreadcrumbs([
            { 'path': '/', 'text': 'Warsztat', 'active': true },
            { 'path': '/zlcenia', 'text': 'Zlecenia', 'active': true },
            { 'path': '', 'text': 'Nowe', 'active': false },
        ]);
        $('.ui.checkbox').checkbox();
    }

    getVehicles(id) {
        this.sub = this.vehicleService.getForConsumer(id)
            .subscribe(vehicles => {
                    this.vehicles = vehicles;
                    this.idIsSet = true
                    this.consumerHasVehicles = true;
                },
                (err) => {
                    this.vehicles = [];
                    this.consumerHasVehicles = false;
                });
    }

    setConsumerId(id) {
        this.consumerId = id;
        this.orderInput['consumerId'] = id;
        this.getVehicles(id);
    }

    ngAfterViewInit() {}

    ngOnDestroy() {
        //this.sub.unsubscribe();
    }

}
