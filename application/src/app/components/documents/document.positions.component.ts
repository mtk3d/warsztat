import { Component, OnInit, OnDestroy, OnChanges, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Http} from '@angular/http';

import { DocumentPositionService } from '../../_services/documentPosition.service';
import { ServiceService } from '../../_services/service.service';
import { StoreService } from '../../_services/store.service';
import { DocumentPosition } from '../../_models/documentPosition.model';
import { Document } from '../../_models/document.model';
import { Service } from '../../_models/service.model';
import { Store } from '../../_models/store.model';

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
    selectItems: any = [];
    lastQuantity: number = 1;
    lastVat: number = this.document['vat'];
    positionType: boolean = false;
    private sub: any;

  constructor(
      private route: ActivatedRoute, 
      private documentPositionService: DocumentPositionService,
      private serviceService: ServiceService,
      private storeService: StoreService
  ) {}

  ngOnInit() {
    this.getPositions();
    this.storeSearch();
  }

  getPositions() {
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
  }

  serviceSearch() {
      this.sub = this.route.params.subscribe(params => {
        this.serviceService.get()
            .subscribe(services => {
                this.selectItems = services;
            },
            (err)=>{
                //error
            }
        );
    });
  }

  getAll(){

  }

  storeSearch() {
      this.sub = this.route.params.subscribe(params => {
        this.storeService.get()
            .subscribe(stores => {
                this.selectItems = stores;
            },
            (err)=>{
                //error
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

  addNewPosition(){
      if(this.addPosition['name']!='')
      {
          this.sub = this.documentPositionService.create(this.addPosition)
                .subscribe((ok)=>{
                    this.sub.unsubscribe();
                    this.closeAdd();
                    this.getPositions();
                });
      }
  }

  addView(){
      this.addPosition['documentId'] = this.documentId;
      this.addPosition['service'] = this.positionType.toString();
      this.addPosition['quantity'] = 1;
      this.addPosition['name'] = '';
      this.addPosition['vat'] = this.document['vat'];
      this.addPosition['netto'] = 0;
      this.addPosition['vatSum'] = 0;
      this.addPosition['brutto'] = 0;
      this.add = true;
      this.notFound = false;
      this.positionType = false;
      this.storeSearch();
  }

  changePositionType() {
      this.positionType = !this.positionType;
      if(this.positionType) {
          this.serviceSearch();
          this.addPosition['name'] = '';
          this.addPosition['netto'] = 0;
          this.addPosition['brutto'] = 0;
          this.addPosition['vatSum'] = 0;
      }else{
          this.storeSearch();
          this.addPosition['name'] = '';
          this.addPosition['netto'] = 0;
          this.addPosition['brutto'] = 0;
          this.addPosition['vatSum'] = 0;
      }
      this.addPosition['service'] = this.positionType.toString();
  }

  typeOfPosition() {
      if(this.positionType) {
          return "Usługi";
      }else{
          return "Magazyn";
      }
  }

  closeAdd(){
      this.add = false;
      this.getPositions();
      this.addPosition = {};
  }

  isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
  }

  doublePrecision(num) {
      return Math.round(num * 100) / 100;
  }

  nameSelect(value) {
      this.addPosition['quantity'] = 1;
      if(value == '')
      {
           this.addPosition['name'] = '';
           this.addPosition['netto'] = 0;
           this.addPosition['brutto'] = 0;
           this.addPosition['vatSum'] = 0;
      }else{
          if(this.positionType)
          {
              this.sub = this.route.params.subscribe(params => {
                this.serviceService.getSingle(value)
                    .subscribe(position => {
                       this.addPosition['name'] = position['name'];
                       this.addPosition['netto'] = position['netto'];
                       this.addPosition['brutto'] = position['brutto'];
                       this.addPosition['vatSum'] = position['vat_sum'];
                       this.addPosition['vat'] = position['vat'];
                       this.addPosition['itemId'] = position['id'];
                    },
                    (err)=>{
                        //error
                    });
              });
          }else{
              this.sub = this.route.params.subscribe(params => {
                this.storeService.getSingle(value)
                    .subscribe(position => {
                       this.addPosition['name'] = position['name'];
                       this.addPosition['netto'] = position['netto'];
                       this.addPosition['brutto'] = position['brutto'];
                       this.addPosition['vatSum'] = position['vat_sum'];
                       this.addPosition['vat'] = position['vat'];
                       this.addPosition['itemId'] = position['id'];
                    },
                    (err)=>{
                        //error
                    });
              });
          }
      }
  }

  nettoBlur(){
      if(!this.isNumeric(this.addPosition['netto']))
      {
          this.addPosition['netto'] = 0;
      }
      this.addPosition['netto'] = this.doublePrecision(this.addPosition['netto']);
      this.addPosition['vatSum'] = this.doublePrecision((this.addPosition['netto'] * this.addPosition['vat']) / (100 - this.addPosition['vat']));
      this.addPosition['brutto'] = this.doublePrecision((this.addPosition['vatSum'] * 100) / this.addPosition['vat']);
  }

  vatSumBlur(){
      if(!this.isNumeric(this.addPosition['vatSum']))
      {
          this.addPosition['vatSum'] = 0;
      }
      this.addPosition['vatSum'] = this.doublePrecision(this.addPosition['vatSum']);
      this.addPosition['netto'] = this.doublePrecision((this.addPosition['vatSum'] * (100 - this.addPosition['vat'])) / this.addPosition['vat']);
      this.addPosition['brutto'] = this.doublePrecision((this.addPosition['vatSum'] * 100) / this.addPosition['vat']);
  }

  quantityBlur(){
      if(!this.isNumeric(this.addPosition['quantity']) || this.addPosition['quantity'] == 0)
      {
          this.addPosition['quantity'] = 1;
      }
      this.addPosition['quantity'] = this.doublePrecision(this.addPosition['quantity']);
      this.addPosition['brutto'] = this.doublePrecision((this.addPosition['brutto'] / this.lastQuantity) * this.addPosition['quantity']);
      this.addPosition['netto'] = this.doublePrecision((this.addPosition['netto'] / this.lastQuantity) * this.addPosition['quantity']);
      this.addPosition['vatSum'] = this.doublePrecision((this.addPosition['vatSum'] / this.lastQuantity) * this.addPosition['quantity']);
      this.lastQuantity = this.addPosition['quantity'];
  }

  vatBlur(){
      if(!this.isNumeric(this.addPosition['vat']) || this.addPosition['vat']<0 || this.addPosition['vat']>100)
      {
          this.addPosition['vat'] = 0;
      }
      this.addPosition['brutto'] = this.doublePrecision((this.addPosition['netto'] * 100) / (100 - this.addPosition['vat']));
      this.addPosition['vatSum'] = this.doublePrecision(this.addPosition['brutto'] - this.addPosition['netto']);
      this.lastVat = this.doublePrecision(this.addPosition['vat']);
  }

  bruttoBlur(){
      if(!this.isNumeric(this.addPosition['brutto']))
      {
          this.addPosition['brutto'] = 0;
      }
      this.addPosition['brutto'] = this.doublePrecision(this.addPosition['brutto']);
      this.addPosition['netto'] = this.doublePrecision((this.addPosition['brutto'] * (100 - this.addPosition['vat'])) / 100);
      this.addPosition['vatSum'] = this.doublePrecision((this.addPosition['brutto'] * this.addPosition['vat']) / 100);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
 
}