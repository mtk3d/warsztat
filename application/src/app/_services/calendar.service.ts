import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
 
@Injectable()
export class CalendarService {
    
    calendar: Array<{number: number, date: any, inactive: boolean, items: Array<{name: string, id: number}>}> = [];

    constructor() {}

    getArray(year, month){
        this.calendar = [];

        let daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if((year%4==0 && year%100!=0) || year%400==0){
            daysInMonths[1] = 29;
        }

        let daysInMonth = daysInMonths[month];

        let firstDayOfMonth = new Date(year, month);
        let firstDayOfWeek = firstDayOfMonth.getDay();
        let daysBefore = null;

        if(firstDayOfWeek == 0)
            daysBefore = 6;
        else if(firstDayOfWeek == 1)
            daysBefore = 7;
        else
            daysBefore = firstDayOfWeek - 1;

        let daysAfter = 42 - daysInMonth - daysBefore;

        let daysInMonthBefore = daysInMonths[month - 1];
        if(month-1 == -1)
        {
            daysInMonthBefore = daysInMonths[11];
        }

        let monthBefore = month - 1;
        let yearBefore = year;
        if(monthBefore == -1)
        {
            yearBefore = year - 1;
            monthBefore = 11;
        }

        for(let i = daysBefore - 1; i >= 0; i--)
        {
            this.calendar.push({
              number: daysInMonthBefore - i,
              date: new Date(yearBefore, monthBefore, daysInMonthBefore - i),
              inactive: true,
              items: []
            });
        }

        for(let i = 1; i <= daysInMonth; i++)
        {
            this.calendar.push({
              number: i,
              date: new Date(year, month, i),
              inactive: false,
              items: []
            });
        }

        let monthAfter = month+1;
        let yearAfter = year;
        if(monthAfter == 12)
        {
            let monthAfter = 0;
            let yearAfter = year + 1;
        }

        for(let i = 1; i <= daysAfter; i++)
        {
            this.calendar.push({
              number: i,
              date: new Date(yearAfter, monthAfter, i),
              inactive: true,
              items: []
            });
        }

        return this.calendar;
    }
}