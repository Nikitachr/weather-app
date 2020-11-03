import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectWeather } from '../reducers';

@Component({
  selector: 'app-humidity',
  templateUrl: './humidity.component.html',
  styleUrls: ['./humidity.component.scss']
})
export class HumidityComponent implements OnInit {

  data$: Observable<any>;
  data: any;
  estimation: string;
  scale: number;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.data$ = this.store.select(selectWeather);
    this.data$.subscribe(res => {
      if (res) {
        this.data = res;
        this.estimate(this.data.current.humidity)
        this.scale = this.data.current.humidity / 100 * 76;
      }
      
    }, err => console.log(err));
  }
  estimate(humidity: number){
    if (humidity < 56) {
      this.estimation = 'Dry'
    } else if (humidity >= 56 && humidity < 71) {
      this.estimation = 'Moderately dry'
    } else if (humidity >= 71 && humidity < 86) {
      this.estimation = 'Moderately wet'
    } else {
      this.estimation = 'Very wet'
    }
  }
}
