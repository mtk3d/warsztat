import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Http} from '@angular/http';

import { BreadcrumbsService } from '../../_services/breadcrumbs.service';

@Component({
  moduleId: module.id,
  selector: 'tires',
  templateUrl: 'tires.component.html'
})
export class TiresComponent implements OnInit, OnDestroy{

  constructor(
      private route: ActivatedRoute,
      private breadcrumbsService: BreadcrumbsService
  ) {}

  ngOnInit() {
      this.breadcrumbsService.sendBreadcrumbs([
            {'path': '/', 'text': 'Warsztat', 'active': true},
            {'path': '/tires', 'text': 'Opony', 'active': false}
        ]);
  }

  ngOnDestroy() {

  }
 
}