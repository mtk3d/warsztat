import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Http} from '@angular/http';



@Component({
  moduleId: module.id,
  selector: 'stores',
  templateUrl: 'stores.component.html'
})
export class StoresComponent implements OnInit, OnDestroy{

  constructor(
      private route: ActivatedRoute
  ) {}

  ngOnInit() {

  }

  ngOnDestroy() {

  }
 
}