import {Component, OnInit, OnDestroy} from '@angular/core';

import { StoreService } from '../../_services/store.service';
import { Store } from '../../_models/store.model';
import { BreadcrumbsService } from '../../_services/breadcrumbs.service';

@Component({
  moduleId: module.id,
  selector: 'stores',
  templateUrl: 'stores.component.html'
})
export class StoresComponent implements OnInit, OnDestroy {
    stores: Store[] = [];
    storesReturn: boolean;
    delete: Array<number> = [];
    allDeleteChecked: boolean = false;
    search: string = '';
    orderBy: string = 'name';
    sorting: string = 'ASC';
    pages: number;
    itemsPerPage: number;
    actualPage: number = 1;
    pagesButtons: Array<number> = [];
    singlePageStores: Store[] = [];
    sub: any;
    deleteLoading: boolean = false;
 
    constructor(
        private storeService: StoreService,
        private breadcrumbsService: BreadcrumbsService
    ) { }
 
    ngOnInit() {
        this.breadcrumbsService.sendBreadcrumbs([
            {'path': '/', 'text': 'Warsztat', 'active': true},
            {'path': '', 'text': 'Magazyn', 'active': false}
        ]);
        this.searchStores();
    }

    searchStores() {
        this.sub = this.storeService.get(this.search, this.orderBy, this.sorting)
            .subscribe(stores => {
                this.stores = stores;
                this.storesReturn = true;
                this.pagesInit();
            },
            (err)=>this.storesReturn = false
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
        this.searchStores();
    }

    page(pageNumber)
    {
        if(pageNumber>=1 && pageNumber<=this.pages)
        {
            this.pagesButtons = [];
            this.singlePageStores = [];
            this.actualPage = pageNumber;
            let startItem = (this.actualPage-1) * this.itemsPerPage;
            let last = this.itemsPerPage;
            if(this.actualPage == this.pages)
            {
                last = this.stores.length-((this.pages-1)*this.itemsPerPage);
            }
            for(let i=0; i<last; i++)
            {
                if(this.stores[startItem + i] != null)
                {
                    this.singlePageStores[i] = this.stores[startItem + i];
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
        this.pages = Math.ceil(this.stores.length/this.itemsPerPage);
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
        this.searchStores();
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
        if(!this.storesReturn)
        {
            this.stores = [];
        }
        return this.storesReturn;
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
            for(let item in this.stores)
            {
                let id = this.stores[item].id;
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
        for(let item in this.stores)
        {
            let id = this.stores[item].id;
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
            this.sub = this.storeService.delete(this.delete[id])
                .subscribe((ok)=>{
                    this.searchStores();
                    this.deleteLoading = false;
                });
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
 
}
