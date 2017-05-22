import { Component, OnInit } from "@angular/core";

import { OrderService } from '../../_services/order.service';
import { Order } from '../../_models/order.model';
import { CalendarService } from '../../_services/calendar.service';
import { BreadcrumbsService } from '../../_services/breadcrumbs.service';


@Component({
    moduleId: module.id,
    selector: "timetable",
    templateUrl: "timetable.component.html",
    styleUrls: ["timetable.component.css"]
})
export class TimetableComponent implements OnInit {

    calendar: any = [];
    orders: Order[] = [];
    today: any;
    month: number;
    year: number;
    nameOfMonths: Array < string > ;
    monthName: string;
    private sub: any;

    constructor(
        private calendarService: CalendarService,
        private orderService: OrderService,
        private breadcrumbsService: BreadcrumbsService
    ) {}

    ngOnInit() {
        this.breadcrumbsService.sendBreadcrumbs([
            { 'path': '/', 'text': 'Warsztat', 'active': true },
            { 'path': '', 'text': 'Terminarz', 'active': false }
        ]);
        this.nameOfMonths = [
            "Styczeń",
            "Luty",
            "Marzec",
            "Kwiecień",
            "Maj",
            "Czerwiec",
            "Lipiec",
            "Sierpień",
            "Wrzesień",
            "Październik",
            "Listopad",
            "Grudzień",
        ];
        this.today = new Date();
        this.month = this.today.getMonth();
        this.year = this.today.getFullYear();
        let day = this.today.getDate();
        this.today = new Date(this.year, this.month, day).toString();
        this.reload();
    }

    nextMonth() {
        this.month = this.month + 1;
        if (this.month == 12) {
            this.month = 0;
            this.year = this.year + 1;
        }
        this.reload();
    }

    previousMonth() {
        this.month = this.month - 1;
        if (this.month == -1) {
            this.month = 11;
            this.year = this.year - 1;
        }
        this.reload();
    }

    reload() {
        this.calendar = this.calendarService.getArray(this.year, this.month);
        this.monthName = this.nameOfMonths[this.month];
        this.getOrders();
    }

    getOrders() {
        this.sub = this.orderService.getDocuments()
            .subscribe(orders => {
                this.orders = orders;
                this.addOrders();
            });
    }

    ordersWithTerm(term) {
        let orders = this.orders.length;
        let termOrders = [];
        for (let n = 0; n < orders; n++) {
            if (this.termTimeReset(this.orders[n]['term']) == term)
            {
                termOrders.push(this.orders[n]);
            }
        }
        return termOrders;
    }

    termTimeReset(term) {
        let date = new Date(term);
        let month = date.getMonth();
        let year = date.getFullYear();
        let day = date.getDate();
        let dateReturn = new Date(year, month, day).toString();
        return dateReturn;
    }

    addOrders() {
        let days = this.calendar.length;
        let orders;
        let ordersQuantity;
        for (let n = 0; n < days; n++) {
            orders = this.ordersWithTerm(this.calendar[n]['date']);
            ordersQuantity = orders.length;
            for(let i = 0; i < ordersQuantity; i++)
            {
                this.calendar[n]['items'].push({
                    "name": "Termin: Zlecenie "+orders[i]['id']+" - "+orders[i]['mark']+" "+orders[i]['model']+" "+orders[i]['registrationNumber'],
                    "id": orders[i]['id'],
                    "completed": orders[i]['completed']
                });
            }
        }
    }

    now() {
        this.today = new Date();
        this.month = this.today.getMonth();
        this.year = this.today.getFullYear();
        let day = this.today.getDate();
        this.today = new Date(this.year, this.month, day).toString();
        this.reload();
    }

}
