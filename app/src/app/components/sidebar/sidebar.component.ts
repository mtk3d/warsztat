import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'sidebar',
    templateUrl: 'sidebar.component.html'
})
export class SidebarComponent implements OnInit {
    username = '';
    firstLetter = '';

    constructor() {}

    ngOnInit() {}

    public isLoggedIn() {
        let userData = JSON.parse(localStorage.getItem("currentUser"));
        if (userData) {
            this.username = userData.username;
            this.firstLetter = userData.username.substring(0, 1);
            return true;
        } else {
            return false;
        }
    }

}
