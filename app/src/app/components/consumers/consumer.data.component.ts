import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';

import { ConsumerService } from '../../_services/consumer.service';
import { Consumer } from '../../_models/consumer.model';

@Component({
    moduleId: module.id,
    selector: 'consumer-data',
    templateUrl: 'consumer.data.component.html'
})
export class ConsumerDataComponent implements OnDestroy, OnInit, OnChanges {

    @Input('consumerId') consumerId: number;

    consumer: Consumer[] = [];
    firstLetter: string;
    hide: boolean = true;
    accountNumber = '';
    editMode: boolean = false;
    consumerInput: any = {};
    private sub: any;

    constructor(
        private consumerService: ConsumerService
    ) {}

    ngOnInit() {
        this.getConsumer();
    }

    getConsumer() {
        this.sub = this.consumerService.getConsumer(this.consumerId)
            .subscribe(consumer => {
                this.consumer = consumer;
                this.firstLetter = consumer['name'].substring(0, 1);

                if (typeof consumer['bankAccount'] !== 'undefined')
                    this.accountNumber = 'PL' + this.shortAccount(consumer['bankAccount']);

            });
    }

    private shortAccount(account) {
        let length = account.length;
        return account.substring(0, 2) + '...' + account.substring(length - 4, length);
    }

    accountNumberToggle() {
        if (typeof this.consumer['bankAccount'] !== 'undefined') {
            if (this.hide) {
                this.accountNumber = 'PL' + this.consumer['bankAccount'];
            } else {
                this.accountNumber = 'PL' + this.shortAccount(this.consumer['bankAccount']);
            }
            this.hide = !this.hide;
        }
    }

    edit() {
        this.editMode = true;
        this.consumerInput = this.consumer;
    }

    save() {
        let company = '';
        let consumerName = '';
        if (typeof this.consumerInput['company'] !== 'undefined') {
            company = this.consumerInput['company'] + ' ';
        }

        if (typeof this.consumerInput['firstName'] !== 'undefined' &&
            typeof this.consumerInput['lastName'] !== 'undefined') {
            consumerName = this.consumerInput['firstName'] + ' ' + this.consumerInput['lastName'];
        }

        this.consumerInput['name'] = company + consumerName;

        if (typeof this.consumerInput['company'] !== 'undefined' ||
            (typeof this.consumerInput['firstName'] !== 'undefined' &&
                typeof this.consumerInput['lastName'] !== 'undefined')
        ) {
            this.sub = this.consumerService.update(this.consumerId, this.consumerInput)
                .subscribe((ok) => {
                    this.sub.unsubscribe();
                    this.editMode = false;
                    this.getConsumer();
                });
        } else {
            // this.dataAlert = true;
            // this.addLoading = false; 
        }
    }

    ngOnChanges() {

    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
