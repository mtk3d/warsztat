import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Http} from '@angular/http';

import { ConsumerService } from '../../_services/consumer.service';
import { Consumer } from '../../_models/consumer.model';
import { BreadcrumbsService } from '../../_services/breadcrumbs.service';

declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'consumer',
  templateUrl: 'consumer.component.html'
})
export class ConsumerComponent implements OnInit, OnDestroy, AfterViewInit{

    id: number;
    consumer: Consumer[] = [];
    tab: string = 'documents';
    private sub: any;

  constructor(
      private route: ActivatedRoute,
      private consumerService: ConsumerService,
      private breadcrumbsService: BreadcrumbsService
  ) {}

  ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number

       this.consumerService.getConsumer(this.id)
            .subscribe(consumer => {
                this.consumer = consumer;
                //this.documentDataLoading = false;
                this.breadcrumbsService.sendBreadcrumbs([
                    {'path': '/', 'text': 'Warsztat', 'active': true},
                    {'path': '/consumers', 'text': 'Klienci', 'active': true},
                    {'path': '', 'text': consumer['name'], 'active': false}
                ]);
        });
    });
  }

  ngAfterViewInit() {}

  ngOnDestroy() {}
 
}