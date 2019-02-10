import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

import { UserDataService } from '../../_services/userData.service';
import { BreadcrumbsService } from '../../_services/breadcrumbs.service';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'registration',
    templateUrl: 'registration.component.html'
})
export class RegistrationComponent implements OnInit, OnDestroy, AfterViewInit {

    user: any = {};
    available: boolean = true;
    availableEmail: boolean = true;
    availableLoading: boolean = false;
    availableEmailLoading: boolean = false;
    match: boolean = true;
    private sub: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserDataService,
        private breadcrumbsService: BreadcrumbsService
    ) {}

    ngOnInit() {
        this.breadcrumbsService.sendBreadcrumbs([
            { 'path': '/', 'text': 'Warsztat', 'active': true },
            { 'path': '', 'text': 'Zarejestruj', 'active': false }
        ]);
    }

    ngAfterViewInit() {
    }

    register() {
        this.user['name'] = this.user['company']+' '+this.user['firstName']+' '+this.user['lastName'];
        this.sub = this.userService.register(this.user)
            .subscribe((ok)=>{
                this.sub.unsubscribe();
                this.router.navigate(['/login']);
            },
            (err)=>{
                this.sub.unsubscribe();
            });
    }

    checkUsername() {
        this.availableLoading = true;
        this.sub = this.userService.available(this.user['_username'])
            .subscribe(resp => {
                this.available = resp['available'];
                this.availableLoading = false;
            });
    }

    checkEmail() {
        this.availableEmailLoading = true;
        this.sub = this.userService.availableEmail(this.user['email'])
            .subscribe(resp => {
                this.availableEmail = resp['available'];
                this.availableEmailLoading = false;
            });
    }

    matchPassword() {
        this.match = false;
        if(this.user['_password'] == this.user['confirmPassword'])
        {
            this.match = true;
        }
    }

    ngOnDestroy() {
        //this.sub.unsubscribe();
    }

}
