import { Component, OnInit, OnDestroy, Input, OnChanges, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

import { OrderService } from '../../_services/order.service';
import { Order } from '../../_models/order.model';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'order-params',
    templateUrl: 'order.params.component.html'
})
export class OrderParamsComponent implements OnInit, OnDestroy, OnChanges, AfterViewChecked {

    @Input('id') id: number;
    order: Order[] = [];
    orderEdit: any = {};
    consumerId: number;
    loading: boolean = true;
    private sub: any;
    edit: boolean = false;
    check: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private orderService: OrderService
    ) {}

    ngOnInit() {
        this.loading = true;
        this.sub = this.orderService.getOrder(this.id)
            .subscribe(order => {
                this.order = order;
                this.order = order;
                this.orderEdit['date'] = this.dateStringToString(this.order['date']);
                this.orderEdit['term'] = this.dateStringToString(this.order['term']);
                this.loading = false;
            });
    }

    ngOnChanges() {}

    ngAfterViewChecked() {
        if (this.check == false) {
            $('.ui.checkbox').checkbox();
            $('.ui.dropdown').dropdown();
            this.check = true;
        }
    }

    editMode(event) {
        this.check = false;
        if (event == true) {
            this.edit = true;
        } else {
            this.edit = false;
        }
    }

    dateStringToString(date) {
        date = date.split("T");
        return date[0];
    }

    save() {
        this.loading = true;
        this.sub = this.orderService.patch(this.orderEdit, this.id)
            .subscribe((ok) => {
                this.sub.unsubscribe();
                this.loading = false;
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
