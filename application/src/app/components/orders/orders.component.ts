import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

import { OrderService } from '../../_services/order.service';
import { Order } from '../../_models/order.model';
import { BreadcrumbsService } from '../../_services/breadcrumbs.service';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'orders',
    templateUrl: 'orders.component.html'
})
export class OrdersComponent implements OnInit, OnDestroy, AfterViewInit {

    orders: Order[] = [];
    ordersReturn: boolean = true;
    delete: Array < number > = [];
    allDeleteChecked: boolean = false;
    from: string;
    to: string;
    search: string = '';
    orderBy: string = 'date';
    sorting: string = 'DESC';
    pages: number;
    itemsPerPage: number;
    actualPage: number = 1;
    pagesButtons: Array < number > = [];
    singlePageOrders: Order[] = [];
    sub: any;

    constructor(
        private route: ActivatedRoute,
        private orderService: OrderService,
        private breadcrumbsService: BreadcrumbsService
    ) {}

    ngOnInit() {
        this.breadcrumbsService.sendBreadcrumbs([
            { 'path': '/', 'text': 'Warsztat', 'active': true },
            { 'path': '', 'text': 'Zlecenia', 'active': false }
        ]);
        this.searchOrders();
    }

    searchOrders() {
        this.sub = this.orderService.getDocuments(this.from, this.to, this.search, this.orderBy, this.sorting)
            .subscribe(documents => {
                    this.orders = documents;
                    this.ordersReturn = true;
                    this.pagesInit();
                },
                (err) => this.ordersReturn = false
            );
        this.delete = [];
        this.allDeleteChecked = false;
    }

    pagesInit() {
        this.itemsPerPage = Math.floor((window.innerHeight - 300) / 43);
        this.pages = Math.ceil(this.orders.length / this.itemsPerPage);
        this.page(1);
    }

    page(pageNumber) {
        if (pageNumber >= 1 && pageNumber <= this.pages) {
            this.pagesButtons = [];
            this.singlePageOrders = [];
            this.actualPage = pageNumber;
            let startItem = (this.actualPage - 1) * this.itemsPerPage;
            let last = this.itemsPerPage;
            if (this.actualPage == this.pages) {
                last = this.orders.length - ((this.pages - 1) * this.itemsPerPage);
            }
            for (let i = 0; i < last; i++) {
                if (this.orders[startItem + i] != null) {
                    this.singlePageOrders[i] = this.orders[startItem + i];
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

    clearSearch() {
        this.search = '';
        this.searchOrders();
    }

    isSearch() {
        if (this.search == '') {
            return false;
        } else {
            return true;
        }
    }

    isReturn() {
        if (!this.ordersReturn) {
            this.orders = [];
        }
        return this.ordersReturn;
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
        this.searchOrders();
    }

    order(item) {
        let ret = '';
        if (this.orderBy == item) {
            ret = this.sorting;
        }
        return ret;
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
            for (let item in this.singlePageOrders) {
                let id = this.singlePageOrders[item].id;
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
        for (let item in this.singlePageOrders) {
            let id = this.singlePageOrders[item].id;
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
            this.sub = this.orderService.delete(this.delete[id])
                .subscribe((ok) => { this.searchOrders(); });
        }
    }

    ngAfterViewInit() {}

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
