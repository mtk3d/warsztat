import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Http} from '@angular/http';

import { DocumentService } from '../../_services/document.service';
import { DocumentPositionService } from '../../_services/documentPosition.service';
import { ConsumerService } from '../../_services/consumer.service';
import { Document } from '../../_models/document.model';
import { DocumentPosition } from '../../_models/documentPosition.model';
import { Consumer } from '../../_models/consumer.model';

@Component({
  moduleId: module.id,
  selector: 'document',
  templateUrl: 'document.component.html'
})
export class DocumentComponent implements OnInit, OnDestroy{
 
    id: number;
    document: Document[] = [];
    documentPositions: DocumentPosition[] = [];
    consumer: Consumer[] = [];
  private sub: any;

  constructor(
      private route: ActivatedRoute, 
      private documentService: DocumentService,
      private documentPositionService: DocumentPositionService,
      private consumerService: ConsumerService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number

       this.documentService.getDocument(this.id)
            .subscribe(document => {
                this.document = document;
                this.consumer = document['consumer'];
        });

        this.documentPositionService.getDocumentPositions(this.id)
            .subscribe(documentPositions => {
                this.documentPositions = documentPositions;
        });

    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
 
}