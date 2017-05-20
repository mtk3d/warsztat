import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { VehicleService } from '../../_services/vehicle.service';
import { Vehicle } from '../../_models/vehicle.model';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'vehicle-add',
    templateUrl: 'vehicle.add.component.html'
})
export class VehicleAddComponent implements OnInit, OnDestroy, OnChanges {

    id: number;
    private sub: any;
    vehicle: any = {};

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private vehicleService: VehicleService
    ) {}

    ngOnInit() {
        $('.ui.checkbox').checkbox();
        $('.ui.dropdown')
            .dropdown();
    }

    add() {
        this.sub = this.vehicleService.create(this.vehicle)
            .subscribe((ok) => {
                this.router.navigate(['/vehicles']);
                this.sub.unsubscribe();
            });
    }

    setConsumerId(consumerId) {
        this.vehicle['consumerId'] = consumerId;
    }

    buttonActive() {
        if (typeof this.vehicle['consumerId'] != 'undefined') {
            return true;
        } else {
            return false;
        }
    }

    ngOnChanges() {}

    ngOnDestroy() {}

}
