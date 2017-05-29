import { Component, OnInit, OnDestroy, Input, OnChanges, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

import { DocumentService } from '../../_services/document.service';
import { Document } from '../../_models/document.model';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'document-params',
    templateUrl: 'document.params.component.html'
})
export class DocumentParamsComponent implements OnInit, OnDestroy, OnChanges, AfterViewChecked {

    @Input('id') id: number;
    document: Document[] = [];
    documentEdit: any = {};
    consumerId: number;
    loading: boolean = true;
    private sub: any;
    edit: boolean = false;
    check: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private documentService: DocumentService
    ) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.loading = true;
            this.documentService.getDocument(this.id)
                .subscribe(document => {
                    this.document = document;
                    this.documentEdit = document;
                    this.documentEdit['date'] = this.dateStringToString(this.documentEdit['date']);
                    this.documentEdit['dateOfPayment'] = this.dateStringToString(this.documentEdit['date']);
                    this.loading = false;
                });
        });
    }

    ngOnChanges() {}

    ngAfterViewChecked() {
        if (this.check == false) {
            $('.ui.checkbox').checkbox();
            $('.ui.dropdown').dropdown();
            this.check = true;
        }
    }

    paymentMethod(data) {
        this.documentEdit['paymentMethod'] = data;
    }

    editMode(event) {
        this.check = false;
        if (event == true) {
            this.edit = true;
        } else {
            this.edit = false;
        }
    }

    dateStringToString(date) {
        date = date.split("T");
        return date[0];
    }

    save() {
        this.loading = true;
        this.sub = this.documentService.patch(this.documentEdit, this.id)
            .subscribe((ok) => {
                this.sub.unsubscribe();
                this.loading = false;
                this.edit = false;
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
