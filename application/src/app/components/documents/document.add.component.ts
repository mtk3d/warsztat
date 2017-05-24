import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { DocumentService } from '../../_services/document.service';
import { Document } from '../../_models/document.model';
import { BreadcrumbsService } from '../../_services/breadcrumbs.service';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'document-add',
    templateUrl: 'document.add.component.html'
})
export class DocumentAddComponent implements OnInit, OnDestroy, OnChanges {

    id: number;
    document: any = {};
    private sub: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private documentService: DocumentService,
        private breadcrumbsService: BreadcrumbsService
    ) {}

    ngOnInit() {
        this.breadcrumbsService.sendBreadcrumbs([
            { 'path': '/', 'text': 'Warsztat', 'active': true },
            { 'path': '/documents', 'text': 'Dokumenty', 'active': true },
            { 'path': '', 'text': 'Nowy', 'active': false },
        ]);
        let today = new Date();
        this.document['date'] = today.toISOString();
        this.document['dateOfPayment'] = today.toISOString();
        this.document['paid'] = false;
        $('.ui.checkbox').checkbox();
        $('.ui.dropdown').dropdown();
    }

    type(type) {
        this.document['type'] = type;
    }

    paymentMethod(type) {
        this.document['paymentMethod'] = type;
    }

    add() {
        this.sub = this.documentService.create(this.document)
            .subscribe((ok) => {
                this.router.navigate(['/documents']);
                this.sub.unsubscribe();
            });
    }

    setConsumerId(consumerId) {
        this.document['consumerId'] = consumerId;
    }

    ngOnChanges() {}

    ngOnDestroy() {}

}
