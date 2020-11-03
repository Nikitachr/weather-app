import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectWeather } from '../reducers';

@Component({
  selector: 'app-wind-status',
  templateUrl: './wind-status.component.html',
  styleUrls: ['./wind-status.component.scss']
})
export class WindStatusComponent implements OnInit {

  data$: Observable<any>;
  data: any;
  estimation: string;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.data$ = this.store.select(selectWeather);
    this.data$.subscribe(res => {
      if(res){
        this.data = res;
        this.estimate(res.current.wind_speed);
      }
    }, err => console.log(err));
  }
  estimate(speed: number){
    if(speed < 2){
      this.estimation = 'calm';
    } else if (speed >= 2 && speed < 6) {
      this.estimation = 'Light air';
    } else if (speed >= 6 && speed < 12) {
      this.estimation = 'Light breeze';
    } else if (speed >= 12 && speed < 20) {
      this.estimation = 'Gentle breeze';
    } else if (speed >= 20 && speed < 29) {
      this.estimation = 'Moderate breeze';
    } else if (speed >= 29 && speed < 39) {
      this.estimation = 'Fresh breeze';
    } else if (speed >= 39 && speed < 50) {
      this.estimation = 'Strong breeze';
    } else if (speed >= 50 && speed < 62) {
      this.estimation = 'High wind';
    } else if (speed >= 62 && speed < 75) {
      this.estimation = 'Gale';
    } else if (speed >= 75 && speed < 89) {
      this.estimation = 'Strong gale';
    } else if (speed >= 89 && speed < 103) {
      this.estimation = 'Storm';
    } else if (speed >= 103 && speed < 118) {
      this.estimation = 'Violent storm';
    } else {
      this.estimation = 'Hurricane force';
    } 
  }
}
