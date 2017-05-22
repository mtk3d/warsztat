import { Component, OnInit, OnDestroy } from '@angular/core';

import { VehicleService } from '../../_services/vehicle.service';
import { Vehicle } from '../../_models/vehicle.model';
import { BreadcrumbsService } from '../../_services/breadcrumbs.service';

@Component({
    moduleId: module.id,
    selector: 'vehicles',
    templateUrl: 'vehicles.component.html'
})
export class VehiclesComponent implements OnInit, OnDestroy {
    vehicles: Vehicle[] = [];
    vehiclesReturn: boolean;
    delete: Array < number > = [];
    allDeleteChecked: boolean = false;
    search: string = '';
    orderBy: string = 'registerNumber';
    sorting: string = 'ASC';
    sub: any;
    pages: number;
    itemsPerPage: number;
    actualPage: number = 1;
    pagesButtons: Array < number > = [];
    singlePageVehicles: Vehicle[] = [];

    constructor(
        private vehicleService: VehicleService,
        private breadcrumbsService: BreadcrumbsService
    ) {}

    ngOnInit() {
        this.breadcrumbsService.sendBreadcrumbs([
            { 'path': '/', 'text': 'Warsztat', 'active': true },
            { 'path': '', 'text': 'Pojazdy', 'active': false }
        ]);
        this.searchVehicles();
    }

    searchVehicles() {
        this.sub = this.vehicleService.getAll(this.search, this.orderBy, this.sorting)
            .subscribe(vehicles => {
                    this.vehicles = vehicles;
                    this.vehiclesReturn = true;
                    this.pagesInit();
                },
                (err) => this.vehiclesReturn = false
            );
        this.delete = [];
        this.allDeleteChecked = false;
    }

    sortingBy(by) {
        if (this.orderBy == by) {
            if (this.sorting == 'DESC') {
                this.sorting = 'ASC';
            } else {
                this.sorting = 'DESC';
            }
        } else {
            this.sorting = 'ASC';
            this.orderBy = by;
        }
        this.searchVehicles();
    }

    order(item) {
        let ret = '';
        if (this.orderBy == item) {
            ret = this.sorting;
        }
        return ret;
    }

    clearSearch() {
        this.search = '';
        this.searchVehicles();
    }

    page(pageNumber) {
        if (pageNumber >= 1 && pageNumber <= this.pages) {
            this.pagesButtons = [];
            this.singlePageVehicles = [];
            this.actualPage = pageNumber;
            let startItem = (this.actualPage - 1) * this.itemsPerPage;
            let last = this.itemsPerPage;
            if (this.actualPage == this.pages) {
                last = this.vehicles.length - ((this.pages - 1) * this.itemsPerPage);
            }
            for (let i = 0; i < last; i++) {
                if (this.vehicles[startItem + i] != null) {
                    this.singlePageVehicles[i] = this.vehicles[startItem + i];
                }
            }
            this.delete = [];
            let firstButton, lastButton;
            if (this.pages <= 6) {
                firstButton = 1;
                lastButton = this.pages;
            } else {
                if (this.actualPage <= 3) {
                    firstButton = 1;
                    lastButton = 5;
                } else if (this.actualPage + 2 >= this.pages) {
                    firstButton = this.pages - 4;
                    lastButton = this.pages;
                } else {
                    firstButton = this.actualPage - 2;
                    lastButton = this.actualPage + 2;
                }
            }

            for (var i = firstButton; i <= lastButton; i++) {
                this.pagesButtons.push(i);
            }
        }
    }

    pagesInit() {
        this.itemsPerPage = Math.floor((window.innerHeight - 300) / 43);
        this.pages = Math.ceil(this.vehicles.length / this.itemsPerPage);
        this.page(1);
    }

    isSearch() {
        if (this.search == '') {
            return false;
        } else {
            return true;
        }
    }

    isReturn() {
        if (!this.vehiclesReturn) {
            this.vehicles = [];
        }
        return this.vehiclesReturn;
    }

    addDelete(id) {
        if (this.delete.indexOf(id) == -1) {
            this.delete.push(id);
        } else {
            this.delete.splice(this.delete.indexOf(id), 1);
        }
    }

    allDelete() {
        if (!this.allDeleteChecked) {
            this.allDeleteChecked = true;
            for (let item in this.vehicles) {
                let id = this.vehicles[item].id;
                if (this.delete.indexOf(id) == -1) {
                    this.delete.push(id);
                }
            }
        } else {
            this.allDeleteChecked = false;
            this.delete = [];
        }
    }

    isAllChecked() {
        let is = true;
        for (let item in this.vehicles) {
            let id = this.vehicles[item].id;
            if (this.delete.indexOf(id) == -1) {
                is = false;
                this.allDeleteChecked = false;
            }
        }
        if (this.delete.length <= 0) {
            is = false;
        }
        if (is) {
            this.allDeleteChecked = true;
        }
        return is;
    }

    isCheck(id) {
        if (this.delete.indexOf(id) == -1) {
            return false;
        } else {
            return true;
        }
    }

    isDelete() {
        if (this.delete.length > 0) {
            return false;
        } else {
            return true;
        }
    }

    deleteChecked() {
        for (let id in this.delete) {
            this.sub = this.vehicleService.delete(this.delete[id])
                .subscribe((ok) => { this.searchVehicles(); });
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
