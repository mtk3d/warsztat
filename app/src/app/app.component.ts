import { Component } from '@angular/core';
import { HttpModule } from '@angular/http';
import {Router, NavigationEnd} from '@angular/router';


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ["app.component.css"],
    providers: [HttpModule]
})
export class AppComponent {
    constructor() {}
}
