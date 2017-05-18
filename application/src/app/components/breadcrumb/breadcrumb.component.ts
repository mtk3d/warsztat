import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs/Subscription';

import { BreadcrumbsService } from '../../_services/breadcrumbs.service';

@Component({
  moduleId: module.id,
  selector: "breadcrumb",
  templateUrl: "breadcrumb.component.html"
})
export class BreadcrumbComponent implements OnInit, OnDestroy {

    breadcrumbs: any = "text";
    subscription: Subscription;

    constructor(private breadcrumbsService: BreadcrumbsService) {
        this.subscription = this.breadcrumbsService.getMessage().subscribe(breadcrumbs => { this.breadcrumbs = breadcrumbs; });
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}