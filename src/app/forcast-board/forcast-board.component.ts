import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectUnits, selectWeather } from '../reducers';
import { IconService } from '../services/icon.service';

@Component({
  selector: 'app-forcast-board',
  templateUrl: './forcast-board.component.html',
  styleUrls: ['./forcast-board.component.scss']
})
export class ForcastBoardComponent implements OnInit {

  @Input() item: any;
  @Input() isDay: boolean;
  isCelsius: boolean;
  isCelsius$: Observable<boolean>;
  iconId: any;
  data$: Observable<any>;

  constructor(private icon: IconService, private store: Store<AppState>) { }

  ngOnInit() {
    this.isCelsius$ = this.store.select(selectUnits);
    this.isCelsius$.subscribe(res => {
      this.isCelsius = res;
    })
    this.iconId = this.item.weather[0].id;
  }
}
