import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Http} from '@angular/http';
import { Router } from '@angular/router';

import { StoreService } from '../../_services/store.service';
import { Store } from '../../_models/store.model';

declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'stores-add',
  templateUrl: 'stores.add.component.html'
})
export class StoresAddComponent implements OnInit, OnDestroy, OnChanges{

    id: number;
    store: any = {};
    lastVat: any;
    private sub: any;
    vehicle: any = [];

  constructor(
      private router: Router,
      private route: ActivatedRoute, 
      private storeService: StoreService
  ) {}

  ngOnInit() {
      this.store['vat'] = 23;
      this.store['netto'] = 0;
      this.store['brutto'] = 0;
      this.store['vatSum'] = 0;
      this.store['quantity'] = 0;
      this.store['unit'] = 'szt.';
      this.lastVat = 0;
  }

  isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
  }

  doublePrecision(num) {
      return Math.round(num * 100) / 100;
  }

  nettoBlur(){
      if(!this.isNumeric(this.store['netto']))
      {
          this.store['netto'] = 0;
      }
      this.store['netto'] = this.doublePrecision(this.store['netto']);
      this.store['vatSum'] = this.doublePrecision((this.store['netto'] * this.store['vat']) / (100 - this.store['vat']));
      this.store['brutto'] = this.doublePrecision((this.store['vatSum'] * 100) / this.store['vat']);
  }

  vatSumBlur(){
      if(!this.isNumeric(this.store['vatSum']))
      {
          this.store['vatSum'] = 0;
      }
      this.store['vatSum'] = this.doublePrecision(this.store['vatSum']);
      this.store['netto'] = this.doublePrecision((this.store['vatSum'] * (100 - this.store['vat'])) / this.store['vat']);
      this.store['brutto'] = this.doublePrecision((this.store['vatSum'] * 100) / this.store['vat']);
  }

  vatBlur(){
      if(!this.isNumeric(this.store['vat']) || this.store['vat']<0 || this.store['vat']>100)
      {
          this.store['vat'] = 0;
      }
      this.store['brutto'] = this.doublePrecision((this.store['netto'] * 100) / (100 - this.store['vat']));
      this.store['vatSum'] = this.doublePrecision(this.store['brutto'] - this.store['netto']);
      this.lastVat = this.doublePrecision(this.store['vat']);
  }

  bruttoBlur(){
      if(!this.isNumeric(this.store['brutto']))
      {
          this.store['brutto'] = 0;
      }
      this.store['brutto'] = this.doublePrecision(this.store['brutto']);
      this.store['netto'] = this.doublePrecision((this.store['brutto'] * (100 - this.store['vat'])) / 100);
      this.store['vatSum'] = this.doublePrecision((this.store['brutto'] * this.store['vat']) / 100);
  }



  add(){
      this.sub = this.storeService.create(this.store)
            .subscribe((ok)=>{
                this.router.navigate(['/stores']);
                this.sub.unsubscribe();
            });
  }

  ngOnChanges(){
  }

  ngOnDestroy() {
  }
 
}