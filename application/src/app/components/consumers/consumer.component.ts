import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Http} from '@angular/http';

import { BreadcrumbsService } from '../../_services/breadcrumbs.service';

declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'consumer',
  templateUrl: 'consumer.component.html'
})
export class ConsumerComponent implements OnInit, OnDestroy, AfterViewInit{

    tab: string = 'documents';

  constructor(
      private route: ActivatedRoute,
      private breadcrumbsService: BreadcrumbsService
  ) {}

  ngOnInit() {
      this.breadcrumbsService.sendBreadcrumbs([
            {'path': '/', 'text': 'Warsztat', 'active': true},
            {'path': '/consumers', 'text': 'Klienci', 'active': true},
            {'path': '', 'text': 'John Doe', 'active': false}
        ]);
  }

  ngAfterViewInit() {}

  ngOnDestroy() {}
 
}