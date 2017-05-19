import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Http} from '@angular/http';

import { BreadcrumbsService } from '../../_services/breadcrumbs.service';

declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'orders',
  templateUrl: 'orders.component.html'
})
export class OrdersComponent implements OnInit, OnDestroy, AfterViewInit{

  constructor(
      private route: ActivatedRoute,
      private breadcrumbsService: BreadcrumbsService
  ) {}

  ngOnInit() {
      this.breadcrumbsService.sendBreadcrumbs([
            {'path': '/', 'text': 'Warsztat', 'active': true},
            {'path': '', 'text': 'Zlecenia', 'active': false}
        ]);
  }

  ngAfterViewInit() {}

  ngOnDestroy() {}
 
}