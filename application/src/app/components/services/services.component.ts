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
    deleteLoading: boolean = false;
 
    constructor(private serviceService: ServiceService) { }
 
    ngOnInit() {
        this.searchServices();
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

    deleteChecked()
    {
        this.deleteLoading = true;
        for(let id in this.delete)
        {
            this.sub = this.serviceService.delete(this.delete[id])
                .subscribe((ok)=>{
                    this.searchServices();
                    this.deleteLoading = false;
                });
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
 
}
