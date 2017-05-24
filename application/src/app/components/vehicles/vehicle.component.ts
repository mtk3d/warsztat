import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

import { VehicleService } from '../../_services/vehicle.service';
import { Vehicle } from '../../_models/vehicle.model';
import { BreadcrumbsService } from '../../_services/breadcrumbs.service';

@Component({
    moduleId: module.id,
    selector: 'vehicle',
    templateUrl: 'vehicle.component.html'
})
export class VehicleComponent implements OnInit, OnDestroy {
    id: number;
    vehicle: Vehicle[] = [];
    vehicleInput: any = [];
    consumerId: number;
    editMode: boolean = false;
    private sub: any;

    constructor(
        private route: ActivatedRoute,
        private vehicleService: VehicleService,
        private breadcrumbsService: BreadcrumbsService
    ) {}

    ngOnInit() {
        this.getVehicle();
    }

    getVehicle() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];

            this.vehicleService.get(this.id)
                .subscribe(vehicle => {
                    this.vehicle = vehicle;
                    this.vehicleInput = vehicle;
                    this.breadcrumbsService.sendBreadcrumbs([
                        { 'path': '/', 'text': 'Warsztat', 'active': true },
                        { 'path': '/vehicles', 'text': 'Pojazdy', 'active': true },
                        { 'path': '', 'text': vehicle['registrationNumber'], 'active': false }
                    ]);
                    this.consumerId = vehicle['consumerId'];
                });
        });
    }

    setConsumerId(id) {
        this.vehicleInput = [];
        this.vehicleInput['consumerId'] = id;
        this.sub = this.vehicleService.patch(this.id, this.vehicleInput)
            .subscribe((ok) => {
                    this.sub.unsubscribe();
                    this.getVehicle();
                });
    }

    save() {
        this.sub = this.vehicleService.update(this.id, this.vehicleInput)
            .subscribe((ok) => {
                    this.sub.unsubscribe();
                    this.editMode = false;
                    this.getVehicle();
                });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
