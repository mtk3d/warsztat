import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
 
@Injectable()
export class CalendarService {
    
    calendar: any = {};

    constructor() {}

    getArray(year, month){
        let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        let firstDayString;

        if(month<10)
        {
            firstDayString = year+'-0'+month+'-01';
        }else{
            firstDayString = year+'-'+month+'-01';
        }

        let firstDayDate = new Date(firstDayString);
        let firstDay = firstDayDate.getDay();
        let lastDay = firstDayDate.getDate() + daysInMonth[month-1] - 1;

        if((year%4==0 && year%100!=0) || year%400==0)
            daysInMonth[1] = 29;

        let daysBefore = firstDay-1;

        if(firstDay==0)
            daysBefore = 6;

        if(firstDay==1)
            daysBefore = 7;

        let daysAfter;

        console.log(lastDay+' last day');

    }

}