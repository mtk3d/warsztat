import { Component, OnInit } from "@angular/core";

import { CalendarService } from '../../_services/calendar.service';


@Component({
  moduleId: module.id,
  selector: "timetable",
  templateUrl: "timetable.component.html",
  styleUrls: ["timetable.component.css"]
})
export class TimetableComponent implements OnInit { 

    calendar: any = [];
    today: any;
    month: number;
    year: number;
    nameOfMonths: Array<string>;
    monthName: string;

    constructor(private calendarService: CalendarService) { }

    ngOnInit() {
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

    nextMonth(){
        this.month = this.month + 1;
        if(this.month == 12)
        {
            this.month = 0;
            this.year = this.year + 1;
        }
        this.reload();
    }

    previousMonth(){
        this.month = this.month - 1;
        if(this.month == -1)
        {
            this.month = 11;
            this.year = this.year - 1;
        }
        this.reload();
    }

    reload() {
        this.calendar = this.calendarService.getArray(this.year, this.month);
        this.monthName = this.nameOfMonths[this.month];
    }

    addOrder() {
        this.calendar[25]['items'].push({
              "name": "Zlecenie 1",
              "uri": "orders/1"
        });
    }

}