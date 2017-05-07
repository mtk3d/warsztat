import { Component, OnInit, OnDestroy, OnChanges, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Http} from '@angular/http';

import { DocumentPositionService } from '../../_services/documentPosition.service';
import { ServiceService } from '../../_services/service.service';
import { StoreService } from '../../_services/store.service';
import { DocumentService } from '../../_services/document.service';
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
    documentSum: Array<number> = []; 
    documentPositions: DocumentPosition[] = [];
    positionsReturn: boolean;
    ordinal: Array<number>;
    add: any;
    addPosition: any = {};
    notFound: boolean = true;
    selectItems: any = [];
    lastQuantity: number = 1;
    lastVat: number = 23;
    positionType: boolean = false;
    delete: Array<number> = [];
    allDeleteChecked: boolean = false;
    deleteLoading: boolean = false;
    editedPosition: any = {};
    edit: boolean = false;
    unit: string = "";
    private sub: any;

  constructor(
      private route: ActivatedRoute, 
      private documentPositionService: DocumentPositionService,
      private serviceService: ServiceService,
      private storeService: StoreService,
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
                this.setDocumentSum();
            },
            (err)=>{
                this.positionsReturn = false; this.notFound = true;
            });
    });
  }

  // editPosition(id){
  //     this.getPositions();

  //     let index = this.documentPositions.map( (el) => el.id ).indexOf(id)

  //     this.editedPosition['name'] = this.documentPositions[index]['name'];
  //     this.editedPosition['netto'] = this.documentPositions[index]['netto'];
  //     this.editedPosition['vat'] = this.documentPositions[index]['vat'];
  //     this.editedPosition['vatSum'] = this.documentPositions[index]['vatSum'];
  //     this.editedPosition['brutto'] = this.documentPositions[index]['brutto'];
  //     console.log(this.editedPosition);
  //     this.documentPositions.splice(index, 1);
  // }

  // isEditing(id) {
  //     return true;
  // }

  setDocumentSum() {
      this.documentSum['netto'] = 0;
      this.documentSum['brutto'] = 0;
      this.documentSum['vatSum'] = 0;
      
      for(let id in this.documentPositions)
        {
            this.documentSum['netto'] += this.documentPositions[id]['netto'];
            this.documentSum['brutto'] += this.documentPositions[id]['brutto'];
            this.documentSum['vatSum'] += this.documentPositions[id]['vat_sum'];
        }
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

  ngOnChanges() {
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
      this.addPosition['vat'] = 23;
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
      }else{
          this.storeSearch();
      }
      this.addPosition['name'] = '';
      this.addPosition['netto'] = 0;
      this.addPosition['brutto'] = 0;
      this.addPosition['vatSum'] = 0;
      this.unit = "";
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
           this.unit = "";
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
                       this.unit = position['unit'];
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

  addDelete(id)
    {
        if(this.delete.indexOf(id) == -1)
        {
            this.delete.push(id);
        }else{
            this.delete.splice(this.delete.indexOf(id), 1);
        }
    }

    allDelete()
    {
        if(!this.allDeleteChecked)
        {
            this.allDeleteChecked = true;
            for(let item in this.documentPositions)
            {
                let id = this.documentPositions[item].id;
                if(this.delete.indexOf(id) == -1)
                {
                    this.delete.push(id);
                }
            }
        }else{
            this.allDeleteChecked = false;
            this.delete = [];
        }
    }

    isAllChecked()
    {
        let is = true;
        for(let item in this.documentPositions)
        {
            let id = this.documentPositions[item].id;
            if(this.delete.indexOf(id) == -1)
            {
                is = false;
                this.allDeleteChecked = false;
            }
        }
        if(this.delete.length<=0)
        {
            is = false;
        }
        if(is)
        {
            this.allDeleteChecked = true;
        }
        return is;
    }

    isCheck(id)
    {
        if(this.delete.indexOf(id) == -1)
        {
            return false;
        }else{
            return true;
        }
    }

    isDelete()
    {
        if(this.delete.length > 0)
        {
            return false;
        }else{
            return true;
        }
    }

    deleteById(id){
        this.deleteLoading = true;
        this.sub = this.documentPositionService.delete(id)
                .subscribe((ok)=>{
                    this.getPositions();
                    this.deleteLoading = false;
                    this.delete = [];
                });
    }

    deleteChecked()
    {
        for(let id in this.delete)
        {
            this.deleteById(this.delete[id]);
        }
        this.getPositions();
    }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
 
}