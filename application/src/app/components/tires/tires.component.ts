import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Http} from '@angular/http';



@Component({
  moduleId: module.id,
  selector: 'tires',
  templateUrl: 'tires.component.html'
})
export class TiresComponent implements OnInit, OnDestroy{

  constructor(
      private route: ActivatedRoute
  ) {}

  ngOnInit() {

  }

  ngOnDestroy() {

  }
 
}