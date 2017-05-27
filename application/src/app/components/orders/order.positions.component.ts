import { Component, OnInit, OnDestroy, OnChanges, Input, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

import { OrderPositionService } from '../../_services/orderPosition.service';
import { ServiceService } from '../../_services/service.service';
import { OrderService } from '../../_services/order.service';
import { EmployeeService } from '../../_services/employee.service';
import { OrderPosition } from '../../_models/orderPosition.model';
import { Order } from '../../_models/order.model';
import { Service } from '../../_models/service.model';
import { Employee } from '../../_models/employee.model';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'order-positions',
    templateUrl: 'order.positions.component.html'
})
export class OrderPositionsComponent implements OnInit, OnDestroy, OnChanges, AfterViewChecked {

    @Input('id') orderId: number;
    orderSum: Array < number > = [];
    orderPositions: OrderPosition[] = [];
    employees: Employee[] = [];
    positionsReturned: boolean;
    showAdd: boolean = false;
    inputPosition: any = {};
    notFound: boolean = true;
    selectItems: any = [];
    lastQuantity: number = 1;
    lastVat: number = 23;
    delete: Array < number > = [];
    allDeleteChecked: boolean = false;
    deleteLoading: boolean = false;
    editedPosition: any = null;
    edit: boolean = false;
    viewCheck: boolean = false;
    private sub: any;

    constructor(
        private route: ActivatedRoute,
        private orderPositionService: OrderPositionService,
        private employeeService: EmployeeService,
        private serviceService: ServiceService
    ) {}

    ngOnInit() {
        this.getPositions();
        this.serviceSearch();
        this.employeesSearch();
        this.inputPosition['service'] = false;
    }

    ngAfterViewChecked() {
        if (this.viewCheck == false) {
            $('.ui.dropdown').dropdown();
            this.viewCheck = true;
        }
    }

    getPositions() {
        this.sub = this.route.params.subscribe(params => {
            this.orderPositionService.getOrderPositions(this.orderId)
                .subscribe(orderPositions => {
                        this.orderPositions = orderPositions;
                        this.positionsReturned = true;
                        this.notFound = false;
                        this.setOrderSum();
                    },
                    (err) => {
                        this.positionsReturned = false;
                        this.notFound = true;
                        this.orderPositions = [];
                    });
        });
    }

    editPosition(id, i) {
        this.viewCheck = false;
        this.inputPosition['id'] = id;
        this.inputPosition['serviceId'] = this.orderPositions[i]['serviceId'];
        this.inputPosition['orderId'] = this.orderId;
        this.inputPosition['employeeId'] = this.orderPositions[i]['employeeId'];
        this.inputPosition['quantity'] = this.orderPositions[i]['quantity'];
        this.inputPosition['completed'] = this.orderPositions[i]['completed'];
        this.inputPosition['unit'] = this.orderPositions[i]['unit'];
        this.inputPosition['name'] = this.orderPositions[i]['name'];
        this.inputPosition['firstName'] = this.orderPositions[i]['firstName'];
        this.inputPosition['lastName'] = this.orderPositions[i]['lastName'];
        this.inputPosition['vat'] = this.orderPositions[i]['vat'];
        this.inputPosition['netto'] = this.orderPositions[i]['netto'];
        this.inputPosition['vatSum'] = this.orderPositions[i]['vatSum'];
        this.inputPosition['brutto'] = this.orderPositions[i]['brutto'];
        this.showAdd = true;
        this.notFound = false;
        this.editedPosition = null;
        this.lastQuantity = this.orderPositions[i]['quantity'];

        this.serviceSearch();
        this.employeesSearch();

        this.editedPosition = id;
        this.showAdd = false;
    }

    isEditing(id) {
        if (id == this.editedPosition)
            return true;
        else
            return false;
    }

    closeChange() {
        this.editedPosition = null;
    }

    setOrderSum() {
        this.orderSum['netto'] = 0;
        this.orderSum['brutto'] = 0;
        this.orderSum['vatSum'] = 0;

        for (let id in this.orderPositions) {
            this.orderSum['netto'] += this.orderPositions[id]['netto'];
            this.orderSum['brutto'] += this.orderPositions[id]['brutto'];
            this.orderSum['vatSum'] += this.orderPositions[id]['vatSum'];
        }
    }

    serviceSearch() {
        this.sub = this.route.params.subscribe(params => {
            this.serviceService.get()
                .subscribe(services => {
                        this.selectItems = services;
                    },
                    (err) => {
                        //error
                    }
                );
        });
    }

    employeesSearch() {
        this.sub = this.route.params.subscribe(params => {
            this.employeeService.get()
                .subscribe(employees => {
                        this.employees = employees;
                    },
                    (err) => {
                        //error
                    }
                );
        });
    }

    ngOnChanges() {}

    addNewPosition() {
        this.inputPosition['service'] = this.inputPosition['service'] ? 1 : 0;
        if (this.inputPosition['name'] != '') {
            this.sub = this.orderPositionService.create(this.inputPosition)
                .subscribe((ok) => {
                    this.sub.unsubscribe();
                    this.closeAdd();
                    this.getPositions();
                });
        }
    }

    addView() {
        this.viewCheck = false;
        this.inputPosition['orderId'] = this.orderId;
        this.inputPosition['service'] = false;
        this.inputPosition['quantity'] = 1;
        this.inputPosition['completed'] = 0;
        this.inputPosition['unit'] = "szt.";
        this.inputPosition['name'] = '';
        this.inputPosition['vat'] = 23;
        this.inputPosition['netto'] = 0;
        this.inputPosition['vatSum'] = 0;
        this.inputPosition['brutto'] = 0;
        this.showAdd = true;
        this.notFound = false;
        this.editedPosition = null;
        this.lastQuantity = 1;
        this.serviceSearch();
        this.employeesSearch();
    }

    updatePosition() {
        this.editedPosition = null;
        this.inputPosition['completed'] = this.inputPosition['completed'] ? 1 : 0;
        if (this.inputPosition['name'] != '') {
            this.sub = this.orderPositionService.update(this.inputPosition, this.inputPosition['id'])
                .subscribe((ok) => {
                    this.sub.unsubscribe();
                    this.closeChange();
                    this.getPositions();
                });
        }
    }

    completed() {
        if (this.inputPosition['completed']) {
            return "Zakończono";
        } else {
            return "W toku";
        }
    }

    changeCompleted() {
        this.inputPosition['completed'] = !this.inputPosition['completed'];
    }

    closeAdd() {
        this.showAdd = false;
        this.getPositions();
        this.inputPosition = {};
    }

    isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    doublePrecision(num) {
        return Math.round(num * 100) / 100;
    }

    nameSelect(value) {
        this.inputPosition['quantity'] = 1;
        if (value == '') {
            this.inputPosition['name'] = '';
            this.inputPosition['netto'] = 0;
            this.inputPosition['brutto'] = 0;
            this.inputPosition['vatSum'] = 0;
            this.inputPosition['unit'] = "szt.";
        } else {
            this.sub = this.route.params.subscribe(params => {
                this.serviceService.getSingle(value)
                    .subscribe(position => {
                            this.inputPosition['name'] = position['name'];
                            this.inputPosition['netto'] = position['netto'];
                            this.inputPosition['brutto'] = position['brutto'];
                            this.inputPosition['vatSum'] = position['vatSum'];
                            this.inputPosition['vat'] = position['vat'];
                            this.inputPosition['serviceId'] = position['id'];
                        },
                        (err) => {
                            //error
                        });
            });

        }
    }

    employeeSelect(value) {
        this.inputPosition['employeeId'] = value;
    }

    nettoBlur() {
        if (!this.isNumeric(this.inputPosition['netto'])) {
            this.inputPosition['netto'] = 0;
        }
        this.inputPosition['netto'] = this.doublePrecision(this.inputPosition['netto']);
        this.inputPosition['vatSum'] = this.doublePrecision((this.inputPosition['netto'] * this.inputPosition['vat']) / (100 - this.inputPosition['vat']));
        this.inputPosition['brutto'] = this.doublePrecision((this.inputPosition['vatSum'] * 100) / this.inputPosition['vat']);
    }

    vatSumBlur() {
        if (!this.isNumeric(this.inputPosition['vatSum'])) {
            this.inputPosition['vatSum'] = 0;
        }
        this.inputPosition['vatSum'] = this.doublePrecision(this.inputPosition['vatSum']);
        this.inputPosition['netto'] = this.doublePrecision((this.inputPosition['vatSum'] * (100 - this.inputPosition['vat'])) / this.inputPosition['vat']);
        this.inputPosition['brutto'] = this.doublePrecision((this.inputPosition['vatSum'] * 100) / this.inputPosition['vat']);
    }

    quantityBlur() {
        if (!this.isNumeric(this.inputPosition['quantity']) || this.inputPosition['quantity'] == 0) {
            this.inputPosition['quantity'] = 1;
        }
        this.inputPosition['quantity'] = this.doublePrecision(this.inputPosition['quantity']);
        this.inputPosition['brutto'] = this.doublePrecision((this.inputPosition['brutto'] / this.lastQuantity) * this.inputPosition['quantity']);
        this.inputPosition['netto'] = this.doublePrecision((this.inputPosition['netto'] / this.lastQuantity) * this.inputPosition['quantity']);
        this.inputPosition['vatSum'] = this.doublePrecision((this.inputPosition['vatSum'] / this.lastQuantity) * this.inputPosition['quantity']);
        this.lastQuantity = this.inputPosition['quantity'];
    }

    vatBlur() {
        if (!this.isNumeric(this.inputPosition['vat']) || this.inputPosition['vat'] < 0 || this.inputPosition['vat'] > 100) {
            this.inputPosition['vat'] = 0;
        }
        this.inputPosition['brutto'] = this.doublePrecision((this.inputPosition['netto'] * 100) / (100 - this.inputPosition['vat']));
        this.inputPosition['vatSum'] = this.doublePrecision(this.inputPosition['brutto'] - this.inputPosition['netto']);
        this.lastVat = this.doublePrecision(this.inputPosition['vat']);
    }

    bruttoBlur() {
        if (!this.isNumeric(this.inputPosition['brutto'])) {
            this.inputPosition['brutto'] = 0;
        }
        this.inputPosition['brutto'] = this.doublePrecision(this.inputPosition['brutto']);
        this.inputPosition['netto'] = this.doublePrecision((this.inputPosition['brutto'] * (100 - this.inputPosition['vat'])) / 100);
        this.inputPosition['vatSum'] = this.doublePrecision((this.inputPosition['brutto'] * this.inputPosition['vat']) / 100);
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
            for (let item in this.orderPositions) {
                let id = this.orderPositions[item].id;
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
        for (let item in this.orderPositions) {
            let id = this.orderPositions[item].id;
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

    deleteById(id) {
        this.deleteLoading = true;
        this.sub = this.orderPositionService.delete(id)
            .subscribe((ok) => {
                this.getPositions();
                this.deleteLoading = false;
                this.delete = [];
            });
    }

    deleteChecked() {
        for (let id in this.delete) {
            this.deleteById(this.delete[id]);
        }
        this.getPositions();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
