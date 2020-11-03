import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectUnits, selectWeather } from '../reducers';
import { IconService } from '../services/icon.service';

@Component({
  selector: 'app-Max-min-temp',
  templateUrl: './Max-min-temp.component.html',
  styleUrls: ['./Max-min-temp.component.scss']
})
export class MaxMinTempComponent implements OnInit {

  data$: Observable<any>;
  data: any;
  isCelsius$: Observable<boolean>;
  isCelsius: boolean;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.data$ = this.store.select(selectWeather);
    this.data$.subscribe(res => {
      this.data = res;
    }, err => console.log(err));
    this.isCelsius$ = this.store.select(selectUnits);
    this.isCelsius$.subscribe(res => {
      this.isCelsius = res;
    })
  }

}
