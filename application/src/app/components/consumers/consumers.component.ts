import {Component, OnInit, OnDestroy} from '@angular/core';

import { ConsumerService } from '../../_services/consumer.service';
import { Consumer } from '../../_models/consumer.model';

@Component({
  moduleId: module.id,
  selector: 'consumers',
  templateUrl: 'consumers.component.html'
})
export class ConsumersComponent implements OnInit, OnDestroy {
    consumers: Consumer[] = [];
    consumersReturn: boolean;
    delete: Array<number> = [];
    allDeleteChecked: boolean = false;
    search: string = '';
    orderBy: string = 'name';
    sorting: string = 'ASC';
    pages: number;
    itemsPerPage: number;
    actualPage: number = 1;
    pagesButtons: Array<number> = [];
    singlePageConsumers: Consumer[] = [];
    sub: any;
    deleteLoading: boolean = false;
 
    constructor(private consumerService: ConsumerService) { }
 
    ngOnInit() {
        this.searchConsumers();
    }

    searchConsumers() {
        this.sub = this.consumerService.getConsumers(this.search, this.orderBy, this.sorting)
            .subscribe(consumers => {
                this.consumers = consumers;
                this.consumersReturn = true;
                this.pagesInit();
            },
            (err)=>this.consumersReturn = false
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
        this.searchConsumers();
    }

    page(pageNumber)
    {
        if(pageNumber>=1 && pageNumber<=this.pages)
        {
            this.pagesButtons = [];
            this.singlePageConsumers = [];
            this.actualPage = pageNumber;
            let startItem = (this.actualPage-1) * this.itemsPerPage;
            let last = this.itemsPerPage;
            if(this.actualPage == this.pages)
            {
                last = this.consumers.length-((this.pages-1)*this.itemsPerPage);
            }
            for(let i=0; i<last; i++)
            {
                if(this.consumers[startItem + i] != null)
                {
                    this.singlePageConsumers[i] = this.consumers[startItem + i];
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
        this.pages = Math.ceil(this.consumers.length/this.itemsPerPage);
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
        this.searchConsumers();
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
        if(!this.consumersReturn)
        {
            this.consumers = [];
        }
        return this.consumersReturn;
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
            for(let item in this.consumers)
            {
                let id = this.consumers[item].id;
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
        for(let item in this.consumers)
        {
            let id = this.consumers[item].id;
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
            this.sub = this.consumerService.delete(this.delete[id])
                .subscribe((ok)=>{
                    this.searchConsumers();
                    this.deleteLoading = false;
                });
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
 
}
