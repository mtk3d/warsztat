import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Http} from '@angular/http';

declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'orders',
  templateUrl: 'orders.component.html'
})
export class OrdersComponent implements OnInit, OnDestroy, AfterViewInit{

  constructor(
      private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {}

  ngOnDestroy() {}
 
}