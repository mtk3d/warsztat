import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Http} from '@angular/http';



@Component({
  moduleId: module.id,
  selector: 'orders',
  templateUrl: 'orders.component.html'
})
export class OrdersComponent implements OnInit, OnDestroy{

  constructor(
      private route: ActivatedRoute
  ) {}

  ngOnInit() {

  }

  ngOnDestroy() {

  }
 
}