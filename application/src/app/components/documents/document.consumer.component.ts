import { Component, OnInit, OnChanges, OnDestroy, Input } from '@angular/core';
import {Http} from '@angular/http';

import { ConsumerService } from '../../_services/consumer.service';
import { Consumer } from '../../_models/consumer.model';

@Component({
  moduleId: module.id,
  selector: 'document-consumer',
  templateUrl: 'document.consumer.component.html'
})
export class DocumentConsumerComponent implements OnDestroy, OnInit, OnChanges{
 
    @Input('consumerId') consumerId: number;
    
    searchStr: string;
    search: boolean = false;
    consumersReturn: boolean = true;
    consumer: Consumer[] = [];
    consumers: Consumer[] = [];
    private sub: any;

    constructor(private consumerService: ConsumerService) {}

    ngOnInit() {}

    ngOnChanges() {
        if(!!this.consumerId){
            this.sub = this.consumerService.getConsumer(this.consumerId)
            .subscribe(consumer => {
                this.consumer = consumer;
            });
        }
    }

    searchConsumer() {
        this.sub = this.consumerService.getSearchConsumers(this.searchStr)
            .subscribe(consumers => {
            this.consumers = consumers;
            this.consumersReturn = true;
        },
            (err)=>this.consumersReturn = false
        );
    }

    isResponse() {
        return this.consumersReturn;
    }

    searchView() {
        this.searchConsumer();
        this.search = true;
    }

    isSearchView() {
        return this.search;
    }

    apply(id) {
        this.search = false;
    }

    cancel() {
        this.search = false;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}