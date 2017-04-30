import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Http} from '@angular/http';



@Component({
  moduleId: module.id,
  selector: 'employees',
  templateUrl: 'employees.component.html'
})
export class EmployeesComponent implements OnInit, OnDestroy{

  constructor(
      private route: ActivatedRoute
  ) {}

  ngOnInit() {

  }

  ngOnDestroy() {

  }
 
}