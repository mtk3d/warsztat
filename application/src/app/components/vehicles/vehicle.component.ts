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
    private sub: any;

    constructor(
        private route: ActivatedRoute,
        private vehicleService: VehicleService,
        private breadcrumbsService: BreadcrumbsService
    ) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];

            this.vehicleService.get(this.id)
                .subscribe(vehicle => {
                    this.vehicle = vehicle;
                    this.breadcrumbsService.sendBreadcrumbs([
                        { 'path': '/', 'text': 'Warsztat', 'active': true },
                        { 'path': '/vehicles', 'text': 'Pojazdy', 'active': true },
                        { 'path': '', 'text': vehicle['registrationNumber'], 'active': false }
                    ]);
                });
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
