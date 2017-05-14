import {Component, OnInit, OnDestroy} from '@angular/core';

import { ServiceService } from '../../_services/service.service';
import { Service } from '../../_models/service.model';

@Component({
  moduleId: module.id,
  selector: 'services',
  templateUrl: 'services.component.html'
})
export class ServicesComponent implements OnInit, OnDestroy {
    services: Service[] = [];
    inputService: any = {};
    servicesReturn: boolean;
    delete: Array<number> = [];
    allDeleteChecked: boolean = false;
    search: string = '';
    orderBy: string = 'name';
    sorting: string = 'ASC';
    pages: number;
    itemsPerPage: number;
    actualPage: number = 1;
    pagesButtons: Array<number> = [];
    singlePageServices: Service[] = [];
    sub: any;
    showAdd: boolean =false;
    deleteLoading: boolean = false;
    lastVat: number = 23;
    editedId: number;
 
    constructor(private serviceService: ServiceService) { }
 
    ngOnInit() {
        this.searchServices();
        this.inputService['netto'] = 0;
        this.inputService['brutto'] = 0;
        this.inputService['vat'] = 23;
        this.inputService['vatSum'] = 0;
    }

    searchServices() {
        this.sub = this.serviceService.get(this.search, this.orderBy, this.sorting)
            .subscribe(services => {
                this.services = services;
                this.servicesReturn = true;
                this.pagesInit();
            },
            (err)=>this.servicesReturn = false
        );
        this.delete = [];
        this.allDeleteChecked = false;
    }

    edit(id, key){
        this.editedId = id;
        this.showAdd = false;

        this.inputService['name'] = this.services[key]['name'];
        this.inputService['netto'] = this.services[key]['netto'];
        this.inputService['brutto'] = this.services[key]['brutto'];
        this.inputService['vat'] = this.services[key]['vat'];
        this.inputService['vatSum'] = this.services[key]['vatSum'];
    }

    update(id) {
        (this.inputService['name'] != '')
        {
            this.sub = this.serviceService.update(id, this.inputService)
                .subscribe((ok)=>{
                    this.sub.unsubscribe();
                    this.editedId = null;
                    this.searchServices();
                });
        }
    }

    addNewService() {
        if(this.inputService['name'] != '')
        {
            this.sub = this.serviceService.create(this.inputService)
                .subscribe((ok)=>{
                    this.sub.unsubscribe();
                    this.showAdd = false;
                    this.searchServices();
                });
        }
    }

    hideEdit(){
        this.editedId = null;
    }

    isEdited(id){
        return (id == this.editedId)
    }

    add() {
        this.showAdd = true;
        this.editedId = null;

        this.inputService['name'] = '';
        this.inputService['netto'] = 0;
        this.inputService['brutto'] = 0;
        this.inputService['vat'] = 23;
        this.inputService['vatSum'] = 0;
    }

    sortingBy(by)
    {
        if(this.orderBy == by)
        {
            if(this.sorting == 'DESC')
            {
                this.sorting = 'ASC';
            }else{
                this.sorting = 'DESC';
            }
        }else{
            this.sorting = 'ASC';
            this.orderBy = by;
        }
        this.searchServices();
    }

    page(pageNumber)
    {
        if(pageNumber>=1 && pageNumber<=this.pages)
        {
            this.pagesButtons = [];
            this.singlePageServices = [];
            this.actualPage = pageNumber;
            let startItem = (this.actualPage-1) * this.itemsPerPage;
            let last = this.itemsPerPage;
            if(this.actualPage == this.pages)
            {
                last = this.services.length-((this.pages-1)*this.itemsPerPage);
            }
            for(let i=0; i<last; i++)
            {
                if(this.services[startItem + i] != null)
                {
                    this.singlePageServices[i] = this.services[startItem + i];
                }
            }
            this.delete = [];
            let firstButton, lastButton;
            if(this.pages<=6)
            {
                firstButton = 1;
                lastButton = this.pages;
            }else{
                if(this.actualPage <= 3)
                {
                    firstButton = 1;
                    lastButton = 5;
                }else if(this.actualPage + 2 >= this.pages) {
                    firstButton = this.pages - 4;
                    lastButton = this.pages;
                } else {
                    firstButton = this.actualPage - 2;
                    lastButton = this.actualPage + 2;
                }
            }

            for (var i = firstButton; i <= lastButton; i++) {
                this.pagesButtons.push(i);
            }
        }
    }

    pagesInit()
    {
        this.itemsPerPage = Math.floor((window.innerHeight-300)/43);
        this.pages = Math.ceil(this.services.length/this.itemsPerPage);
        this.page(1);
    }

    order(item)
    {
        let ret = '';
        if(this.orderBy == item)
        {
            ret = this.sorting;
        }
        return ret;
    }

    clearSearch()
    {
        this.search = '';
        this.searchServices();
    }

    isSearch()
    {
        if(this.search == '')
        {
            return false;
        }else{
            return true;
        }
    }

    isReturn()
    {
        if(!this.servicesReturn)
        {
            this.services = [];
        }
        return this.servicesReturn;
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
            for(let item in this.services)
            {
                let id = this.services[item].id;
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
        for(let item in this.services)
        {
            let id = this.services[item].id;
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

    deleteById(id) {
        this.sub = this.serviceService.delete(id)
                .subscribe((ok)=>{
                    this.searchServices();
                    this.deleteLoading = false;
                });
    }

    deleteChecked()
    {
        this.deleteLoading = true;
        for(let id in this.delete)
        {
            this.deleteById(this.delete[id])
        }
    }

    isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
  }

  doublePrecision(num) {
      return Math.round(num * 100) / 100;
  }

    nettoBlur(){
      if(!this.isNumeric(this.inputService['netto']))
      {
          this.inputService['netto'] = 0;
      }
      this.inputService['netto'] = this.doublePrecision(this.inputService['netto']);
      this.inputService['vatSum'] = this.doublePrecision((this.inputService['netto'] * this.inputService['vat']) / (100 - this.inputService['vat']));
      this.inputService['brutto'] = this.doublePrecision((this.inputService['vatSum'] * 100) / this.inputService['vat']);
  }

  vatSumBlur(){
      if(!this.isNumeric(this.inputService['vatSum']))
      {
          this.inputService['vatSum'] = 0;
      }
      this.inputService['vatSum'] = this.doublePrecision(this.inputService['vatSum']);
      this.inputService['netto'] = this.doublePrecision((this.inputService['vatSum'] * (100 - this.inputService['vat'])) / this.inputService['vat']);
      this.inputService['brutto'] = this.doublePrecision((this.inputService['vatSum'] * 100) / this.inputService['vat']);
  }

  vatBlur(){
      if(!this.isNumeric(this.inputService['vat']) || this.inputService['vat']<0 || this.inputService['vat']>100)
      {
          this.inputService['vat'] = 0;
      }
      this.inputService['brutto'] = this.doublePrecision((this.inputService['netto'] * 100) / (100 - this.inputService['vat']));
      this.inputService['vatSum'] = this.doublePrecision(this.inputService['brutto'] - this.inputService['netto']);
      this.lastVat = this.doublePrecision(this.inputService['vat']);
  }

  bruttoBlur(){
      if(!this.isNumeric(this.inputService['brutto']))
      {
          this.inputService['brutto'] = 0;
      }
      this.inputService['brutto'] = this.doublePrecision(this.inputService['brutto']);
      this.inputService['netto'] = this.doublePrecision((this.inputService['brutto'] * (100 - this.inputService['vat'])) / 100);
      this.inputService['vatSum'] = this.doublePrecision((this.inputService['brutto'] * this.inputService['vat']) / 100);
  }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
 
}
