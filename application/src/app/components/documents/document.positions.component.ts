import { Component, OnInit, OnDestroy, OnChanges, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Http} from '@angular/http';

import { DocumentPositionService } from '../../_services/documentPosition.service';
import { DocumentPosition } from '../../_models/documentPosition.model';
import { Document } from '../../_models/document.model';

declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'document-positions',
  templateUrl: 'document.positions.component.html'
})
export class DocumentPositionsComponent implements OnInit, OnDestroy, OnChanges{

    @Input('id') documentId: number; 
    @Input('document') document: Document[] = []; 
    documentPositions: DocumentPosition[] = [];
    positionsReturn: boolean;
    ordinal: Array<number>;
    add: any;
    addPosition: any = {};
    notFound: boolean = true;
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
                this.positionsReturn = true;
                this.notFound = false;
        },
            (err)=>{this.positionsReturn = false; this.notFound = true;}
        );

    });
  }

  ngOnChanges() {}

  isReturn(){
      return this.positionsReturn;
  }

  noReturn(){
      return this.notFound;
  }

  isAddView(){
      $('.ui.dropdown')
          .dropdown({
              apiSettings: {
                  url: '//api.semantic-ui.com/tags/{query}'
              }
          });
      return this.add;
  }

  addView(){
      this.add = true;
      this.notFound = false;
  }

  closeAdd(){
      this.add = false;
      this.notFound = true;
      this.addPosition = {};
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
 
}