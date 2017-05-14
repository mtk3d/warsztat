import { Component, OnInit } from "@angular/core";

import { CalendarService } from '../../_services/calendar.service';

@Component({
  moduleId: module.id,
  selector: "timetable",
  templateUrl: "timetable.component.html",
  styleUrls: ["timetable.component.css"]
})
export class TimetableComponent implements OnInit { 

    constructor(private calendarService: CalendarService) { }

    ngOnInit() { 
        let day = new Date('2017-04-31');
        console.log(this.calendarService.getArray(2017, 5));
    }
}