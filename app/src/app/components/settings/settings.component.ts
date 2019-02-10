import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

import { UserDataService } from '../../_services/userData.service';
import { BreadcrumbsService } from '../../_services/breadcrumbs.service';

@Component({
    moduleId: module.id,
    selector: 'settings',
    templateUrl: 'settings.component.html'
})
export class SettingsComponent implements OnInit {

    user: any = [];
    loading: boolean = false;
    message: string;
    private sub: any;
    availableEmail: boolean = true;
    availableEmailLoading: boolean = false;
    oldEmail: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserDataService,
        private breadcrumbsService: BreadcrumbsService
    ) {}

    ngOnInit() {
        this.breadcrumbsService.sendBreadcrumbs([
            { 'path': '/', 'text': 'Warsztat', 'active': true },
            { 'path': '', 'text': 'Ustawienia', 'active': false }
        ]);
    }

    ngAfterViewInit() {
        this.sub = this.route.params.subscribe(params => {
            this.userService.get()
                .subscribe(user => {
                    this.user = user;
                    this.oldEmail = user['email'];
                });
        });
    }

    save() {
        this.loading = true;
        this.user['name'] = this.user['company']+' '+this.user['firstName']+' '+this.user['lastName'];
        this.sub = this.userService.update(this.user)
            .subscribe((ok)=>{
                this.sub.unsubscribe();
                this.loading = false;
                this.message = 'ok';
                this.oldEmail = this.user['email'];
            },
            (err)=>{
                this.sub.unsubscribe();
                this.loading = false;
                this.message = 'err';
            });
    }

    checkEmail() {
        this.availableEmailLoading = true;
        this.sub = this.userService.availableEmail(this.user['email'])
            .subscribe(resp => {
                this.availableEmail = resp['available'];
                if(this.user['email'] == this.oldEmail)
                {
                    this.availableEmail = true;
                }
                this.availableEmailLoading = false;
            });
    }

    ngOnDestroy() {
        //this.sub.unsubscribe();
    }

}
