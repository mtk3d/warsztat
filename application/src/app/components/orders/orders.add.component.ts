import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

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

    orderInput: any = {};
    vehicles: Vehicle[] = [];
    selectedVehicle: any = {};
    inputVehicle: any = {};
    idIsSet: boolean = false;
    consumerHasVehicles: boolean = false;
    consumerId: number;
    vehicleId: number;
    addMode: boolean = false;
    private sub: any;

    constructor(
        private router: Router,
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
        let today = new Date();
        this.orderInput['date'] = today.toISOString();
        this.orderInput['term'] = today.toISOString();
        this.orderInput['completed'] = false;
    }

    getVehicles(id) {
        this.sub = this.vehicleService.getForConsumer(id)
            .subscribe(vehicles => {
                    this.vehicles = vehicles;
                    this.idIsSet = true;
                    this.consumerHasVehicles = true;
                },
                (err) => {
                    this.vehicles = [];
                    this.idIsSet = true;
                    this.consumerHasVehicles = false;
                });
    }

    setVehicle(i) {
        this.vehicleId = this.vehicles[i]['id'];
        this.selectedVehicle = this.vehicles[i];
    }

    setConsumerId(id) {
        this.consumerId = id;
        this.orderInput['consumerId'] = id;
        this.getVehicles(id);
    }

    addVehicle() {
        this.inputVehicle['consumerId'] = this.consumerId;
        this.sub = this.vehicleService.create(this.inputVehicle)
            .subscribe(
                (ok)=>{
                    this.sub.unsubscribe();
                    this.getVehicles(this.consumerId);
                },
                (err)=>{
                    this.sub.unsubscribe();
                    this.getVehicles(this.consumerId);
                }
            );
       this.addMode = false;
    }

    add() {
        this.orderInput['vehicleId'] = this.vehicleId;
        this.orderInput['consumerId'] = this.consumerId;
        this.sub = this.orderService.create(this.orderInput)
            .subscribe(
                (ok)=>{
                    this.sub.unsubscribe()
                    this.router.navigate(['/orders']);
                },
                (err)=>{
                    this.sub.unsubscribe()
                }
            );
    }

    ngAfterViewInit() {}

    ngOnDestroy() {
        //this.sub.unsubscribe();
    }

}
