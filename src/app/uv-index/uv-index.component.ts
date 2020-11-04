import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectWeather } from '../reducers';

@Component({
  selector: 'app-uv-index',
  templateUrl: './uv-index.component.html',
  styleUrls: ['./uv-index.component.scss']
})
export class UvIndexComponent implements OnInit, AfterViewInit {
  @ViewChild('myCanvas', { static: false }) myCanvas: ElementRef<HTMLCanvasElement>;
  data$: Observable<any>;
  data: any;
  
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.data$ = this.store.select(selectWeather)
    this.data$.subscribe(res => {
      this.data = res;
    }, err => console.log(err));
  }
 
  ngAfterViewInit() {
    this.data$.subscribe(res => {
      this.data = res;
      if(this.data){
        var ctx = this.myCanvas.nativeElement.getContext('2d');
        ctx.clearRect(0, 0, this.myCanvas.nativeElement.width, this.myCanvas.nativeElement.height);

        ctx.beginPath();
        ctx.arc(115, 135, 95, 3.14, 0, false);
        ctx.strokeStyle = '#F3F3F3'
        ctx.lineWidth = 15;
        ctx.stroke();

        const calculation = -3.14-((this.data.current.uvi * 100 / 15) * (-3.14) / 100);

        ctx.beginPath();
        ctx.arc(115, 135, 95, 3.14, parseFloat(calculation.toFixed(2)), false);
        ctx.strokeStyle = this.perc2color(this.data.current.uvi, 0, 14)
        ctx.lineWidth = 25;
        ctx.stroke();
      }
    }, err => console.log(err));
    
    
  }
  perc2color(perc,min,max) {
    var base = (max - min);

    if (base == 0) { perc = 100; }
    else {
        perc = (perc - min) / base * 100; 
    }
    var r, g, b = 0;
    if (perc < 50) {
        g = 255;
        r = Math.round(5.1 * perc);
    }
    else {
        r = 255;
        g = Math.round(510 - 5.10 * perc);
    }
    var h = r * 0x10000 + g * 0x100 + b * 0x1;
    return '#' + ('000000' + h.toString(16)).slice(-6);
}
}
