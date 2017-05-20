import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';

import { DocumentService } from '../../_services/document.service';
import { Document } from '../../_models/document.model';
import { BreadcrumbsService } from '../../_services/breadcrumbs.service';

@Component({
    moduleId: module.id,
    selector: 'documents',
    templateUrl: 'documents.component.html'
})
export class DocumentsComponent implements OnInit, OnChanges, OnDestroy {
    documents: Document[] = [];
    documentsReturn: boolean = true;
    delete: Array < number > = [];
    allDeleteChecked: boolean = false;
    type: string = '';
    from: string;
    to: string;
    search: string = '';
    orderBy: string = 'date';
    sorting: string = 'DESC';
    pages: number;
    itemsPerPage: number;
    actualPage: number = 1;
    pagesButtons: Array < number > = [];
    singlePageDocuments: Document[] = [];
    sub: any;

    constructor(
        private documentService: DocumentService,
        private breadcrumbsService: BreadcrumbsService
    ) {}

    ngOnInit() {
        this.breadcrumbsService.sendBreadcrumbs([
            { 'path': '/', 'text': 'Warsztat', 'active': true },
            { 'path': '', 'text': 'Dokumenty', 'active': false }
        ]);
        this.searchDocuments();
    }

    searchDocuments() {
        this.sub = this.documentService.getDocuments(this.type, this.from, this.to, this.search, this.orderBy, this.sorting)
            .subscribe(documents => {
                    this.documents = documents;
                    this.documentsReturn = true;
                    this.pagesInit();
                },
                (err) => this.documentsReturn = false
            );
        this.delete = [];
        this.allDeleteChecked = false;
    }

    pagesInit() {
        this.itemsPerPage = Math.floor((window.innerHeight - 300) / 43);
        this.pages = Math.ceil(this.documents.length / this.itemsPerPage);
        this.page(1);
    }

    typeChange(type) {
        this.type = type;
        this.searchDocuments();
    }

    checkType(type) {
        if (this.type == type) {
            return true;
        } else {
            return false;
        }
    }

    page(pageNumber) {
        if (pageNumber >= 1 && pageNumber <= this.pages) {
            this.pagesButtons = [];
            this.singlePageDocuments = [];
            this.actualPage = pageNumber;
            let startItem = (this.actualPage - 1) * this.itemsPerPage;
            let last = this.itemsPerPage;
            if (this.actualPage == this.pages) {
                last = this.documents.length - ((this.pages - 1) * this.itemsPerPage);
            }
            for (let i = 0; i < last; i++) {
                if (this.documents[startItem + i] != null) {
                    this.singlePageDocuments[i] = this.documents[startItem + i];
                }
            }
            this.delete = [];
            let firstButton, lastButton;
            if (this.pages <= 6) {
                firstButton = 1;
                lastButton = this.pages;
            } else {
                if (this.actualPage <= 3) {
                    firstButton = 1;
                    lastButton = 5;
                } else if (this.actualPage + 2 >= this.pages) {
                    firstButton = this.pages - 4;
                    lastButton = this.pages;
                } else {
                    firstButton = this.actualPage - 2;
                    lastButton = this.actualPage + 2;
                }
            }

            for (var i = firstButton; i <= lastButton; i++) {
                this.pagesButtons.push(i);
            }
        }
    }

    clearSearch() {
        this.search = '';
        this.searchDocuments();
    }

    isSearch() {
        if (this.search == '') {
            return false;
        } else {
            return true;
        }
    }

    isReturn() {
        if (!this.documentsReturn) {
            this.documents = [];
        }
        return this.documentsReturn;
    }

    sortingBy(by) {
        if (this.orderBy == by) {
            if (this.sorting == 'DESC') {
                this.sorting = 'ASC';
            } else {
                this.sorting = 'DESC';
            }
        } else {
            this.sorting = 'ASC';
            this.orderBy = by;
        }
        this.searchDocuments();
    }

    order(item) {
        let ret = '';
        if (this.orderBy == item) {
            ret = this.sorting;
        }
        return ret;
    }

    addDelete(id) {
        if (this.delete.indexOf(id) == -1) {
            this.delete.push(id);
        } else {
            this.delete.splice(this.delete.indexOf(id), 1);
        }
    }

    allDelete() {
        if (!this.allDeleteChecked) {
            this.allDeleteChecked = true;
            for (let item in this.singlePageDocuments) {
                let id = this.singlePageDocuments[item].id;
                if (this.delete.indexOf(id) == -1) {
                    this.delete.push(id);
                }
            }
        } else {
            this.allDeleteChecked = false;
            this.delete = [];
        }
    }

    isAllChecked() {
        let is = true;
        for (let item in this.singlePageDocuments) {
            let id = this.singlePageDocuments[item].id;
            if (this.delete.indexOf(id) == -1) {
                is = false;
                this.allDeleteChecked = false;
            }
        }
        if (this.delete.length <= 0) {
            is = false;
        }
        if (is) {
            this.allDeleteChecked = true;
        }
        return is;
    }

    isCheck(id) {
        if (this.delete.indexOf(id) == -1) {
            return false;
        } else {
            return true;
        }
    }

    isDelete() {
        if (this.delete.length > 0) {
            return false;
        } else {
            return true;
        }
    }

    deleteChecked() {
        for (let id in this.delete) {
            this.sub = this.documentService.deleteDocument(this.delete[id])
                .subscribe((ok) => { this.searchDocuments(); });
        }
    }

    ngOnChanges() {

    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
