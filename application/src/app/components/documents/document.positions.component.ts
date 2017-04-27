import { Component, OnInit, OnDestroy, OnChanges, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Http} from '@angular/http';

import { DocumentPositionService } from '../../_services/documentPosition.service';
import { ServiceService } from '../../_services/service.service';
import { DocumentPosition } from '../../_models/documentPosition.model';
import { Document } from '../../_models/document.model';
import { Service } from '../../_models/service.model';

declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'document-positions',
  templateUrl: 'document.positions.component.html'
})
export class DocumentPositionsComponent implements OnInit, OnDestroy, OnChanges{

    @Input('id') documentId: number; 
    @Input('document') document: Document[] = []; 
    documentPositions: DocumentPosition[] = [];
    positionsReturn: boolean;
    ordinal: Array<number>;
    add: any;
    addPosition: any = {};
    notFound: boolean = true;
    services: Service[] = [];
    lastQuantity: number = 1;
    lastVat: number = 23;
    private sub: any;

  constructor(
      private route: ActivatedRoute, 
      private documentPositionService: DocumentPositionService,
      private serviceService: ServiceService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
        this.documentPositionService.getDocumentPositions(this.documentId)
            .subscribe(documentPositions => {
                this.documentPositions = documentPositions;
                this.positionsReturn = true;
                this.notFound = false;
            },
            (err)=>{
                this.positionsReturn = false; this.notFound = true;
            });
    });
    this.serviceSearch();
  }

  serviceSearch() {
      this.sub = this.route.params.subscribe(params => {
        this.serviceService.get()
            .subscribe(services => {
                this.services = services;
                console.log(this.services);
            },
            (err)=>{

            }
        );
    });
  }

  ngOnChanges() {}

  isReturn(){
      return this.positionsReturn;
  }

  noReturn(){
      return this.notFound;
  }

  isAddView(){      
      return this.add;
  }

  addView(){
      this.addPosition['quantity'] = 1;
      this.addPosition['vat'] = 23;
      this.addPosition['netto'] = 0;
      this.addPosition['vatSum'] = 0;
      this.addPosition['brutto'] = 0;
      this.add = true;
      this.notFound = false;
  }

  closeAdd(){
      this.add = false;
      this.notFound = true;
      this.addPosition = {};
  }

  isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
  }

  nettoBlur(){
      if(!this.isNumeric(this.addPosition['netto']))
      {
          this.addPosition['netto'] = 0;
      }
      this.addPosition['netto'] = Math.round(this.addPosition['netto'] * this.addPosition['quantity']*100)/100;
      this.addPosition['vatSum'] = Math.round(((this.addPosition['netto'] * this.addPosition['vat'])/77)*100)/100;
      this.addPosition['brutto'] = Math.round((this.addPosition['netto'] + this.addPosition['vatSum'])*100)/100;
  }

  vatSumBlur(){
      if(!this.isNumeric(this.addPosition['vatSum']))
      {
          this.addPosition['vatSum'] = 0;
      }
      this.addPosition['vatSum'] = Math.round(this.addPosition['vatSum']*this.addPosition['quantity']*100)/100;
      this.addPosition['netto'] = Math.round((this.addPosition['vatSum']*77)/this.addPosition['vat']*100)/100;
      this.addPosition['brutto'] = Math.round((this.addPosition['netto'] + this.addPosition['vatSum'])*100)/100;
  }

  quantityBlur(){
      if(!this.isNumeric(this.addPosition['quantity']) || this.addPosition['quantity'] == 0)
      {
          this.addPosition['quantity'] = 1;
      }
      this.addPosition['brutto'] = this.addPosition['brutto']/this.lastQuantity;
      this.lastQuantity = this.addPosition['quantity'];
      this.addPosition['brutto'] = Math.round(this.addPosition['brutto'] * this.addPosition['quantity']*100)/100;
      this.addPosition['netto'] = Math.round(((this.addPosition['brutto'] * 77)/100)*100)/100;
      this.addPosition['vatSum'] = Math.round((this.addPosition['brutto'] - this.addPosition['netto'])*100)/100;
  }

  vatBlur(){
      if(!this.isNumeric(this.addPosition['vat']))
      {
          this.addPosition['vat'] = 0;
      }
      this.addPosition['vatSum'] = this.addPosition['vatSum']/this.addPosition['quantity'];
      this.addPosition['vatSum'] = (Math.round(((this.addPosition['vatSum'] * this.lastVat)/this.addPosition['vat'])*100)/100)*this.addPosition['quantity'];
      this.addPosition['netto'] = (Math.round(((this.addPosition['vatSum'] * 77)/this.addPosition['vat'])*100)/100)*this.addPosition['quantity'];
      this.addPosition['brutto'] = (Math.round((this.addPosition['netto'] + this.addPosition['vatSum'])*100)/100)*this.addPosition['quantity'];
      this.lastVat = this.addPosition['vat'];
  }

  bruttoBlur(){
      if(!this.isNumeric(this.addPosition['brutto']))
      {
          this.addPosition['brutto'] = 0;
      }
      this.addPosition['vatSum'] = Math.round(((this.addPosition['brutto'] * this.addPosition['vat'])/100)*100)/100;
      this.addPosition['netto'] = Math.round((this.addPosition['brutto'] - this.addPosition['vatSum'])*100)/100;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
 
}