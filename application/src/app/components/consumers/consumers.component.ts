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
