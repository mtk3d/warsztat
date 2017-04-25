import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import {Http} from '@angular/http';

import { ConsumerService } from '../../_services/consumer.service';
import { Consumer } from '../../_models/consumer.model';

@Component({
  moduleId: module.id,
  selector: 'consumer-input',
  templateUrl: 'consumer.input.component.html',
  outputs: ['consumerOutput']
})
export class ConsumerInputComponent implements OnDestroy, OnInit, OnChanges{
 
    @Output() consumerOutput = new EventEmitter();
    consumerId: number;
    searchStr: string;
    search: boolean = false;
    consumersReturn: boolean = true;
    consumer: Consumer[] = [];
    consumers: Consumer[] = [];
    private sub: any;

    constructor(private consumerService: ConsumerService) {}

    ngOnInit() {
        this.searchView();
    }

    ngOnChanges() {
        if(!!this.consumerId){
            this.sub = this.consumerService.getConsumer(this.consumerId)
            .subscribe(consumer => {
                this.consumer = consumer;
            });
        }
    }

    loadConsumer() {
        this.sub = this.consumerService.getConsumer(this.consumerId)
             .subscribe(consumer => {
                 this.consumer = consumer;
             });
    }

    searchConsumer() {
        this.sub = this.consumerService.getConsumers(this.searchStr)
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

    isSetConsumer(){
        if(typeof this.consumerId !== 'undefined')
        {
            return true;
        }else{
            return false;
        }
    }

    apply(id) {
        this.consumerId = id;
        this.search = false;
        this.loadConsumer();
        this.consumerOutput.emit(id);
    }

    cancel() {
        this.search = false;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}