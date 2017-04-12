import { Component, OnInit, OnDestroym, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Http} from '@angular/http';

import { DocumentPositionService } from '../../_services/documentPosition.service';
import { DocumentPosition } from '../../_models/documentPosition.model';

@Component({
  moduleId: module.id,
  selector: 'document-positions',
  templateUrl: 'document.positions.component.html'
})
export class DocumentComponent implements OnInit, OnDestroy{

    @Input('id') documentId: number; 
    documentPositions: DocumentPosition[] = [];
    private sub: any;

  constructor(
      private route: ActivatedRoute, 
      private documentPositionService: DocumentPositionService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
        this.documentPositionService.getDocumentPositions(this.documentId)
            .subscribe(documentPositions => {
                this.documentPositions = documentPositions;
        });

    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
 
}