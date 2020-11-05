import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ChangeUnits } from '../actions/weather.actions';
import { AppState, selectUnits, selectWeather } from '../reducers';

@Component({
  selector: 'app-right-bar',
  templateUrl: './right-bar.component.html',
  styleUrls: ['./right-bar.component.scss'],
  animations: [
    trigger(
      'Today', 
      [
        transition(
          ':enter', 
          [
            style({ transform: 'translateX(-1300px)', opacity: 0 }),
            animate('0.5s ease', 
                    style({ transform: 'translateX(0px)', opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ transform: 'translateX(0px)', opacity: 1 }),
            animate('0.5s ease', 
                    style({ transform: 'translateX(-1300px)', opacity: 0 }))
          ], 
        )
      ]
    ),
    trigger(
      'Week', 
      [
        transition(
          ':enter', 
          [
            style({ transform: 'translateX(1300px)', opacity: 0 }),
            animate('0.5s ease', 
                    style({ transform: 'translateX(0px)', opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ transform: 'translateX(0px)', opacity: 1 }),
            animate('0.5s ease', 
                    style({ transform: 'translateX(1300px)', opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class RightBarComponent implements OnInit {

  data$: Observable<any>;
  data: any;
  daily: any[];
  hourly: any[];
  isCelsius: boolean;
  isCelsius$: Observable<boolean>;
  isToday: boolean = true;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.data$ = this.store.select(selectWeather);
    this.data$.subscribe(res => {
      if (res) {
        this.data = res;
        this.daily = res.daily.slice(0, 7);
        this.hourly = res.hourly.filter((value, index) => {return index % 3 == 0}).slice(0, 8);
      }
    }, err => console.log(err));
    this.isCelsius$ = this.store.select(selectUnits);
    this.isCelsius$.subscribe(res => {
      this.isCelsius = res;
    })
  }

  onCelsius(){
    this.store.dispatch(new ChangeUnits({isCelsius: true}));
  }

  onFahrenheit(){
    this.store.dispatch(new ChangeUnits({isCelsius: false}));
  }
}
