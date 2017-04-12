import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Http} from '@angular/http';

import { DocumentService } from '../../_services/document.service';
import { DocumentPositionService } from '../../_services/documentPosition.service';
import { Document } from '../../_models/document.model';
import { DocumentPosition } from '../../_models/documentPosition.model';

@Component({
  moduleId: module.id,
  selector: 'document',
  templateUrl: 'document.component.html'
})
export class DocumentComponent implements OnInit, OnDestroy{
 
    id: number;
    document: Document[] = [];
    documentPositions: DocumentPosition[] = [];
    consumerId: number;
  private sub: any;

  constructor(
      private route: ActivatedRoute, 
      private documentService: DocumentService,
      private documentPositionService: DocumentPositionService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number

       this.documentService.getDocument(this.id)
            .subscribe(document => {
                this.document = document;
                this.consumerId = document['consumer']['id'];
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

  clicked() {
      this.consumerId += 1;
      console.log(this.consumerId);
  }
 
}