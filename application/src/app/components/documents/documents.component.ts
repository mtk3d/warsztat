import {Component, OnInit} from '@angular/core';

import { DocumentService } from '../../_services/document.service';

@Component({
  moduleId: module.id,
  selector: 'documents',
  templateUrl: 'documents.component.html'
})
export class DocumentsComponent implements OnInit {
    documents: Document[] = [];
 
    constructor(private documentService: DocumentService) { }
 
    ngOnInit() {
        // get documents from secure api end point
        this.documentService.getDocuments()
            .subscribe(documents => {
                this.documents = documents;
            });
    }
 
}
