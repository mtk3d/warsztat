import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Http} from '@angular/http';
import { Router } from '@angular/router';

import { ServiceService } from '../../_services/service.service';
import { Service } from '../../_models/service.model';

declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'service-add',
  templateUrl: 'service.add.component.html'
})
export class ServiceAddComponent implements OnInit, OnDestroy, OnChanges{
 
    id: number;
    service: any = {};
    lastVat: any;
    private sub: any;
    vehicle: any = [];

  constructor(
      private router: Router,
      private route: ActivatedRoute, 
      private serviceService: ServiceService
  ) {}

  ngOnInit() {
      this.service['vat'] = 23;
      this.service['netto'] = 0;
      this.service['brutto'] = 0;
      this.service['vatSum'] = 0;
      this.lastVat = 0;
  }

  isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
  }

  doublePrecision(num) {
      return Math.round(num * 100) / 100;
  }

  nettoBlur(){
      if(!this.isNumeric(this.service['netto']))
      {
          this.service['netto'] = 0;
      }
      this.service['netto'] = this.doublePrecision(this.service['netto']);
      this.service['vatSum'] = this.doublePrecision((this.service['netto'] * this.service['vat']) / (100 - this.service['vat']));
      this.service['brutto'] = this.doublePrecision((this.service['vatSum'] * 100) / this.service['vat']);
  }

  vatSumBlur(){
      if(!this.isNumeric(this.service['vatSum']))
      {
          this.service['vatSum'] = 0;
      }
      this.service['vatSum'] = this.doublePrecision(this.service['vatSum']);
      this.service['netto'] = this.doublePrecision((this.service['vatSum'] * (100 - this.service['vat'])) / this.service['vat']);
      this.service['brutto'] = this.doublePrecision((this.service['vatSum'] * 100) / this.service['vat']);
  }

  vatBlur(){
      if(!this.isNumeric(this.service['vat']) || this.service['vat']<0 || this.service['vat']>100)
      {
          this.service['vat'] = 0;
      }
      this.service['brutto'] = this.doublePrecision((this.service['netto'] * 100) / (100 - this.service['vat']));
      this.service['vatSum'] = this.doublePrecision(this.service['brutto'] - this.service['netto']);
      this.lastVat = this.doublePrecision(this.service['vat']);
  }

  bruttoBlur(){
      if(!this.isNumeric(this.service['brutto']))
      {
          this.service['brutto'] = 0;
      }
      this.service['brutto'] = this.doublePrecision(this.service['brutto']);
      this.service['netto'] = this.doublePrecision((this.service['brutto'] * (100 - this.service['vat'])) / 100);
      this.service['vatSum'] = this.doublePrecision((this.service['brutto'] * this.service['vat']) / 100);
  }



  add(){
      this.sub = this.serviceService.create(this.service)
            .subscribe((ok)=>{
                this.router.navigate(['/services']);
                this.sub.unsubscribe();
            });
  }

  ngOnChanges(){
  }

  ngOnDestroy() {
  }
 
}