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
    loading: boolean = true;
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
                this.loading = false;
            });
        }
        if(typeof this.consumerId != 'undefined')
        {
            this.cancel();
        }
    }

    loadConsumer() {
        this.loading = true;
        this.sub = this.consumerService.getConsumer(this.consumerId)
             .subscribe(consumer => {
                 this.consumer = consumer;
                 this.loading = false;
             });
    }

    searchConsumer() {
        this.loading = true;
        this.sub = this.consumerService.getConsumers(this.searchStr)
            .subscribe(consumers => {
                this.consumers = consumers;
                this.consumersReturn = true;
                this.loading = false;
            },
                (err)=>{
                    this.consumersReturn = false
                    this.loading = false;
                }
            );
    }

    searchView() {
        this.searchConsumer();
        this.search = true;
        this.add = false;
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

    isSetConsumer(){
        if(typeof this.consumerId !== 'undefined')
        {
            return true;
        }else{
            return false;
        }
    }

    create() {
        this.loading = true;
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
                this.loading = false;
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