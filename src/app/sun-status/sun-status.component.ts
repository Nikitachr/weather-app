import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectWeather } from '../reducers';

@Component({
  selector: 'app-sun-status',
  templateUrl: './sun-status.component.html',
  styleUrls: ['./sun-status.component.scss']
})
export class SunStatusComponent implements OnInit {

  data$: Observable<any>;
  data: any;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.data$ = this.store.select(selectWeather);
    this.data$.subscribe(res => {
      this.data = res;
    }, err => console.log(err));
  }

}
