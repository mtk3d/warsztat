import {Component, OnInit, OnChanges, OnDestroy} from '@angular/core';

import { DocumentService } from '../../_services/document.service';
import { Document } from '../../_models/document.model';

@Component({
  moduleId: module.id,
  selector: 'documents',
  templateUrl: 'documents.component.html'
})
export class DocumentsComponent implements OnInit, OnChanges, OnDestroy {
    documents: Document[] = [];
    documentsReturn: boolean = true;
    type: string = '';
    from: string;
    to: string;
    search: string;
    sub: any;
 
    constructor(private documentService: DocumentService) { }
 
    ngOnInit() {
        this.searchDocuments();
    }

    searchDocuments() {
        this.sub = this.documentService.getDocuments(this.type, this.from, this.to, this.search)
            .subscribe(documents => {
                this.documents = documents;
                this.documentsReturn = true;
            },
            (err)=>this.documentsReturn = false
        );
    }

    typeChange(type){
        this.type = type;
        this.searchDocuments();
    }

    checkType(type){
        if(this.type == type)
        {
            return true;
        }else{
            return false;
        }
    }

    isReturn()
    {
        return this.documentsReturn;
    }

    ngOnChanges() {
        
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
 
}
