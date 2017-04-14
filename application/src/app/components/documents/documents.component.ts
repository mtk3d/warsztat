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
    delete: Array<number> = [];
    allDeleteChecked: boolean = false;
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
        this.delete = [];
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
        if(!this.documentsReturn)
        {
            this.documents = [];
        }
        return this.documentsReturn;
    }

    addDelete(id)
    {
        if(this.delete.indexOf(id) == -1)
        {
            this.delete.push(id);
        }else{
            this.delete.splice(this.delete.indexOf(id), 1);
        }
    }

    allDelete()
    {
        if(!this.allDeleteChecked)
        {
            this.allDeleteChecked = true;
            for(let item in this.documents)
            {
                let id = this.documents[item].id;
                if(this.delete.indexOf(id) == -1)
                {
                    this.delete.push(id);
                }
            }
        }else{
            this.allDeleteChecked = false;
            this.delete = [];
        }
    }

    isAllChecked()
    {
        let is = true;
        for(let item in this.documents)
        {
            let id = this.documents[item].id;
            if(this.delete.indexOf(id) == -1)
            {
                is = false;
                this.allDeleteChecked = false;
            }
        }
        if(this.delete.length<=0)
        {
            is = false;
        }
        if(is)
        {
            this.allDeleteChecked = true;
        }
        return is;
    }

    isCheck(id)
    {
        if(this.delete.indexOf(id) == -1)
        {
            return false;
        }else{
            return true;
        }
    }

    isDelete()
    {
        if(this.delete.length > 0)
        {
            return false;
        }else{
            return true;
        }
    }

    deleteChecked()
    {
        console.log(this.delete);
    }

    ngOnChanges() {
        
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
 
}
