import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  moduleId: module.id,
  selector: 'sidebar',
  templateUrl: 'sidebar.component.html'
})
export class SidebarComponent implements OnInit {
    subscription: Subscription;
    username = 'user';
    firstLetter = '';

  constructor() {}

  ngOnInit() {
      let userData = JSON.parse(localStorage.getItem("currentUser"));
      if(userData)
      {
          this.username = userData.username;
          this.firstLetter = userData.username.substring(0,1);
      }
  }  

}