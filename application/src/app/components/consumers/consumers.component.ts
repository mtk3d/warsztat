import {Component, OnInit} from '@angular/core';

import { ConsumerService } from '../../_services/consumer.service';
import { Consumer } from '../../_models/consumer.model';

@Component({
  moduleId: module.id,
  selector: 'consumers',
  templateUrl: 'consumers.component.html'
})
export class ConsumersComponent implements OnInit {
    consumers: Consumer[] = [];
 
    constructor(private consumerService: ConsumerService) { }
 
    ngOnInit() {
        // get documents from secure api end point
        this.consumerService.getConsumers()
            .subscribe(consumers => {
                this.consumers = consumers;
            });
    }
 
}
