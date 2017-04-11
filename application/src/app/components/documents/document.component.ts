import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Http} from '@angular/http';

import { DocumentService } from '../../_services/document.service';

@Component({
  moduleId: module.id,
  selector: 'document',
  templateUrl: 'document.component.html'
})
export class DocumentComponent implements OnInit, OnDestroy{
 
    id: number;
    document: Document[] = [];
    consumer: any;
  private sub: any;

  constructor(private route: ActivatedRoute, private documentService: DocumentService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number

       this.documentService.getDocument(this.id)
            .subscribe(document => {
                this.document = document;
                this.consumer = document['consumer'];
        });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
 
}
