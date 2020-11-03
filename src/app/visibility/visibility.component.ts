import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectWeather } from '../reducers';

@Component({
  selector: 'app-visibility',
  templateUrl: './visibility.component.html',
  styleUrls: ['./visibility.component.scss']
})
export class VisibilityComponent implements OnInit {

  data$: Observable<any>;
  data: any;
  estimation: string;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.data$ = this.store.select(selectWeather);
    this.data$.subscribe(res => {
      if(res) {
        this.data = res;
        this.estimate(this.data.current.visibility / 1000);
      }
    }, err => console.log(err));
  }
  estimate(score: number) {
    if (score >= 0 && score < 0.5) {
      this.estimation = 'Very bad';
    } else if (score >= 0.5 && score < 2) {
      this.estimation = 'Bad';
    } else if (score >= 2 && score < 10) {
      this.estimation = 'Average';
    } else if (score >= 10 && score < 20) {
      this.estimation = 'Good';
    } else {
      this.estimation = 'Very good';
    }
  }

}
