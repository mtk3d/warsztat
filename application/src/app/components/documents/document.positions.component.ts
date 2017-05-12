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
    positionsReturned: boolean;
    showAdd: boolean = false;
    inputPosition: any = {};
    notFound: boolean = true;
    selectItems: any = [];
    lastQuantity: number = 1;
    lastVat: number = 23;
    delete: Array<number> = [];
    allDeleteChecked: boolean = false;
    deleteLoading: boolean = false;
    editedPosition: any = null;
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
    this.inputPosition['service'] = false;
  }

  getPositions() {
      this.sub = this.route.params.subscribe(params => {
        this.documentPositionService.getDocumentPositions(this.documentId)
            .subscribe(documentPositions => {
                this.documentPositions = documentPositions;
                this.positionsReturned = true;
                this.notFound = false;
                this.setDocumentSum();
            },
            (err)=>{
                this.positionsReturned = false; this.notFound = true;
                this.documentPositions = [];
            });
    });
  }

  editPosition(id, i){
      this.inputPosition['id'] = id; 
      this.inputPosition['documentId'] = this.documentId;
      this.inputPosition['service'] = this.documentPositions[i]['service'];
      this.inputPosition['quantity'] = this.documentPositions[i]['quantity'];
      this.inputPosition['name'] = this.documentPositions[i]['name'];
      this.inputPosition['vat'] = this.documentPositions[i]['vat'];
      this.inputPosition['netto'] = this.documentPositions[i]['netto'];
      this.inputPosition['vatSum'] = this.documentPositions[i]['vat_sum'];
      this.inputPosition['brutto'] = this.documentPositions[i]['brutto'];
      this.showAdd = true;
      this.notFound = false;
      this.editedPosition = null;
      this.lastQuantity = this.documentPositions[i]['quantity'];
      
      if(this.inputPosition['service'])
          this.serviceSearch();
      else
          this.storeSearch();

      this.editedPosition = id;
      this.showAdd = false;
  }

  isEditing(id) {
      if(id == this.editedPosition)
          return true;
      else
          return false;
  }

  closeChange() {
      this.editedPosition = null;
  }

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
      this.inputPosition['service'] = this.inputPosition['service'] ? 1 : 0;
      if(this.inputPosition['name']!='')
      {
          this.sub = this.documentPositionService.create(this.inputPosition)
                .subscribe((ok)=>{
                    this.sub.unsubscribe();
                    this.closeAdd();
                    this.getPositions();
                });
      }
  }

  addView(){
      this.inputPosition['documentId'] = this.documentId;
      this.inputPosition['service'] = false;
      this.inputPosition['quantity'] = 1;
      this.inputPosition['name'] = '';
      this.inputPosition['vat'] = 23;
      this.inputPosition['netto'] = 0;
      this.inputPosition['vatSum'] = 0;
      this.inputPosition['brutto'] = 0;
      this.showAdd = true;
      this.notFound = false;
      this.editedPosition = null;
      this.lastQuantity = 1;
      this.storeSearch();
  }

  changePositionType() {
      if(this.inputPosition['service']) {
          this.serviceSearch();
      }else{
          this.storeSearch();
      }
      this.inputPosition['name'] = '';
      this.inputPosition['netto'] = 0;
      this.inputPosition['brutto'] = 0;
      this.inputPosition['vatSum'] = 0;
      this.unit = "";
      this.lastQuantity = 1;
  }

  updatePosition() {
      this.editedPosition = null;
      this.inputPosition['service'] = this.inputPosition['service'] ? 1 : 0;
      if(this.inputPosition['name']!='')
      {
          this.sub = this.documentPositionService.update(this.inputPosition, this.inputPosition['id'])
                .subscribe((ok)=>{
                    this.sub.unsubscribe();
                    this.closeChange();
                    this.getPositions();
                });
      }
  }

  typeOfPosition() {
      if(this.inputPosition['service']) {
          return "Usługi";
      }else{
          return "Magazyn";
      }
  }

  closeAdd(){
      this.showAdd = false;
      this.getPositions();
      this.inputPosition = {};
  }

  isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
  }

  doublePrecision(num) {
      return Math.round(num * 100) / 100;
  }

  nameSelect(value) {
      this.inputPosition['quantity'] = 1;
      if(value == '')
      {
           this.inputPosition['name'] = '';
           this.inputPosition['netto'] = 0;
           this.inputPosition['brutto'] = 0;
           this.inputPosition['vatSum'] = 0;
           this.unit = "";
      }else{
          if(this.inputPosition['service'])
          {
              this.sub = this.route.params.subscribe(params => {
                this.serviceService.getSingle(value)
                    .subscribe(position => {
                       this.inputPosition['name'] = position['name'];
                       this.inputPosition['netto'] = position['netto'];
                       this.inputPosition['brutto'] = position['brutto'];
                       this.inputPosition['vatSum'] = position['vat_sum'];
                       this.inputPosition['vat'] = position['vat'];
                       this.inputPosition['itemId'] = position['id'];
                    },
                    (err)=>{
                        //error
                    });
              });
          }else{
              this.sub = this.route.params.subscribe(params => {
                this.storeService.getSingle(value)
                    .subscribe(position => {
                       this.inputPosition['name'] = position['name'];
                       this.inputPosition['netto'] = position['netto'];
                       this.inputPosition['brutto'] = position['brutto'];
                       this.inputPosition['vatSum'] = position['vat_sum'];
                       this.inputPosition['vat'] = position['vat'];
                       this.inputPosition['itemId'] = position['id'];
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
      if(!this.isNumeric(this.inputPosition['netto']))
      {
          this.inputPosition['netto'] = 0;
      }
      this.inputPosition['netto'] = this.doublePrecision(this.inputPosition['netto']);
      this.inputPosition['vatSum'] = this.doublePrecision((this.inputPosition['netto'] * this.inputPosition['vat']) / (100 - this.inputPosition['vat']));
      this.inputPosition['brutto'] = this.doublePrecision((this.inputPosition['vatSum'] * 100) / this.inputPosition['vat']);
  }

  vatSumBlur(){
      if(!this.isNumeric(this.inputPosition['vatSum']))
      {
          this.inputPosition['vatSum'] = 0;
      }
      this.inputPosition['vatSum'] = this.doublePrecision(this.inputPosition['vatSum']);
      this.inputPosition['netto'] = this.doublePrecision((this.inputPosition['vatSum'] * (100 - this.inputPosition['vat'])) / this.inputPosition['vat']);
      this.inputPosition['brutto'] = this.doublePrecision((this.inputPosition['vatSum'] * 100) / this.inputPosition['vat']);
  }

  quantityBlur(){
      if(!this.isNumeric(this.inputPosition['quantity']) || this.inputPosition['quantity'] == 0)
      {
          this.inputPosition['quantity'] = 1;
      }
      this.inputPosition['quantity'] = this.doublePrecision(this.inputPosition['quantity']);
      this.inputPosition['brutto'] = this.doublePrecision((this.inputPosition['brutto'] / this.lastQuantity) * this.inputPosition['quantity']);
      this.inputPosition['netto'] = this.doublePrecision((this.inputPosition['netto'] / this.lastQuantity) * this.inputPosition['quantity']);
      this.inputPosition['vatSum'] = this.doublePrecision((this.inputPosition['vatSum'] / this.lastQuantity) * this.inputPosition['quantity']);
      this.lastQuantity = this.inputPosition['quantity'];
  }

  vatBlur(){
      if(!this.isNumeric(this.inputPosition['vat']) || this.inputPosition['vat']<0 || this.inputPosition['vat']>100)
      {
          this.inputPosition['vat'] = 0;
      }
      this.inputPosition['brutto'] = this.doublePrecision((this.inputPosition['netto'] * 100) / (100 - this.inputPosition['vat']));
      this.inputPosition['vatSum'] = this.doublePrecision(this.inputPosition['brutto'] - this.inputPosition['netto']);
      this.lastVat = this.doublePrecision(this.inputPosition['vat']);
  }

  bruttoBlur(){
      if(!this.isNumeric(this.inputPosition['brutto']))
      {
          this.inputPosition['brutto'] = 0;
      }
      this.inputPosition['brutto'] = this.doublePrecision(this.inputPosition['brutto']);
      this.inputPosition['netto'] = this.doublePrecision((this.inputPosition['brutto'] * (100 - this.inputPosition['vat'])) / 100);
      this.inputPosition['vatSum'] = this.doublePrecision((this.inputPosition['brutto'] * this.inputPosition['vat']) / 100);
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