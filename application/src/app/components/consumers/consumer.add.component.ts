import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Http} from '@angular/http';
import { Router } from '@angular/router';

import { ConsumerService } from '../../_services/consumer.service';
import { Consumer } from '../../_models/consumer.model';

declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'consumer-add',
  templateUrl: 'consumer.add.component.html'
})
export class ConsumerAddComponent implements OnInit, OnDestroy, OnChanges{
 
    id: number;
    consumer: any = {};
    dataAlert: boolean = false;
    addLoading: boolean = false;
    private sub: any;

  constructor(
      private router: Router,
      private route: ActivatedRoute, 
      private consumerService: ConsumerService
  ) {}

  ngOnInit() {}

  add(){
      this.addLoading = true; 
      let company = '';
      let consumerName = '';
        if(typeof this.consumer['company'] !== 'undefined')
        {
            company = this.consumer['company']+' ';
        }

        if(typeof this.consumer['firstName'] !== 'undefined' && 
            typeof this.consumer['lastName'] !== 'undefined')
        {
            consumerName = this.consumer['firstName']+' '+this.consumer['lastName'];
        }

        this.consumer['name'] = company+consumerName;

        if(typeof this.consumer['company'] !== 'undefined' || 
            (typeof this.consumer['firstName'] !== 'undefined' && 
            typeof this.consumer['lastName'] !== 'undefined')
        ){
            this.sub = this.consumerService.create(this.consumer)
            .subscribe((ok)=>{
                this.router.navigate(['/consumers']);
                this.sub.unsubscribe();
            });
        }else{
            this.dataAlert = true;
            this.addLoading = false; 
        }
  }

  showDataAlert()
  {
      return this.dataAlert;
  }

  closeDataAlert()
  {
      this.dataAlert = false;
  }

  ngOnChanges(){
  }

  ngOnDestroy() {
  }
 
}