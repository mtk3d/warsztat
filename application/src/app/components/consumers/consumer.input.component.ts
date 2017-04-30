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
 
    @Input('consumerId') consumerId: number;
    @Output() consumerOutput = new EventEmitter();
    searchStr: string;
    search: boolean = false;
    add: boolean = false;
    consumersReturn: boolean = true;
    consumer: Consumer[] = [];
    consumerAdd: any = {};
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
        if(typeof this.consumerId != 'undefined')
        {
            this.cancel();
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
        this.add = false;
    }

    isSearchView() {
        return this.search;
    }

    isConsumerView() {
        if(this.search == true || this.add == true)
        {
            return false;
        }else{
            return true;
        }
    }

    addConsumer() {
        this.search = false;
        this.add = true;
    }

    isAddView() {
        return this.add;
    }

    isSetConsumer(){
        if(typeof this.consumerId !== 'undefined')
        {
            return true;
        }else{
            return false;
        }
    }

    create() {
        let company = '';
        if(typeof this.consumerAdd['company'] !== 'undefined')
        {
            company = this.consumerAdd['company']+' - ';
        }
        this.consumerAdd['name'] = company+this.consumerAdd['firstName']+' '+this.consumerAdd['lastName'];
        this.sub = this.consumerService.create(this.consumerAdd)
            .subscribe((ok)=>{
                this.searchView();
                this.searchConsumer();
                this.sub.unsubscribe();
            });
    }

    apply(id) {
        this.consumerId = id;
        this.search = false;
        this.loadConsumer();
        this.consumerOutput.emit(id);
    }

    cancel() {
        this.search = false;
        this.add = false;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}