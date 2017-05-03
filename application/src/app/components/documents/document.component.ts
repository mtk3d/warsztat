import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Http} from '@angular/http';

import { DocumentService } from '../../_services/document.service';
import { UserDataService } from '../../_services/userData.service';
import { Document } from '../../_models/document.model';
import { UserData } from '../../_models/userData.model';

@Component({
  moduleId: module.id,
  selector: 'document',
  templateUrl: 'document.component.html'
})
export class DocumentComponent implements OnInit, OnDestroy, OnChanges{
 
    id: number;
    document: Document[] = [];
    userData: UserData[] = [];
    consumerId: number;
    userDataLoading: boolean = true;
    documentDataLoading: boolean = true;
    private sub: any;

  constructor(
      private route: ActivatedRoute, 
      private documentService: DocumentService,
      private userDataService: UserDataService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number

       this.documentService.getDocument(this.id)
            .subscribe(document => {
                this.document = document;
                this.consumerId = document['consumerId'];
                this.documentDataLoading = false;
        });

    });

    this.sub = this.route.params.subscribe(params => {
       this.userDataService.get()
            .subscribe(userData => {
                this.userData = userData;
                this.userDataLoading = false;
        });
    });
  }

  ngOnChanges() {
         
  }

  setConsumerId(id) {
      console.log(id);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
 
}