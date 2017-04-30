import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Http} from '@angular/http';



@Component({
  moduleId: module.id,
  selector: 'services',
  templateUrl: 'services.component.html'
})
export class ServicesComponent implements OnInit, OnDestroy{

  constructor(
      private route: ActivatedRoute
  ) {}

  ngOnInit() {

  }

  ngOnDestroy() {

  }
 
}