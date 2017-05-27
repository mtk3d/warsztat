import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

import { DocumentService } from '../../_services/document.service';
import { UserDataService } from '../../_services/userData.service';
import { BreadcrumbsService } from '../../_services/breadcrumbs.service';
import { pdfGeneratorService } from '../../_services/pdfGenerator.service';
import { Document } from '../../_models/document.model';
import { UserData } from '../../_models/userData.model';

@Component({
    moduleId: module.id,
    selector: 'document',
    templateUrl: 'document.component.html'
})
export class DocumentComponent implements OnInit, OnDestroy, OnChanges {

    id: number;
    document: Document[] = [];
    documentPatch: any = [];
    userData: UserData[] = [];
    consumerId: number;
    userDataLoading: boolean = true;
    documentDataLoading: boolean = true;
    private sub: any;

    constructor(
        private route: ActivatedRoute,
        private documentService: DocumentService,
        private userDataService: UserDataService,
        private breadcrumbsService: BreadcrumbsService,
        private pdfGeneratorService: pdfGeneratorService
    ) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number

            this.documentService.getDocument(this.id)
                .subscribe(document => {
                    this.document = document;
                    this.consumerId = document['consumerId'];
                    this.documentDataLoading = false;
                    this.breadcrumbsService.sendBreadcrumbs([
                        { 'path': '/', 'text': 'Warsztat', 'active': true },
                        { 'path': '/documents', 'text': 'Dokumenty', 'active': true },
                        { 'path': '', 'text': document['number'], 'active': false }
                    ]);
                });
        });

        this.sub = this.userDataService.get()
            .subscribe(userData => {
                this.userData = userData;
                this.userDataLoading = false;
            });
    }

    ngOnChanges() {

    }

    setConsumerId(id) {
        this.documentPatch['consumerId'] = id;
        this.sub = this.documentService.patch(this.documentPatch, this.id)
            .subscribe((ok) => {
                this.sub.unsubscribe();
                this.documentPatch['consumerId'] = null;
            });
    }

    getDoc(method) {
        this.pdfGeneratorService.getPDF(this.id, method);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
