import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LeftBarComponent } from './left-bar/left-bar.component';
import { RightBarComponent } from './right-bar/right-bar.component';
import { ForcastBoardComponent } from './forcast-board/forcast-board.component';
import { UvIndexComponent } from './uv-index/uv-index.component';
import { MapComponent } from './map/map.component';
import { WindStatusComponent } from './wind-status/wind-status.component';
import { SunStatusComponent } from './sun-status/sun-status.component';
import { HumidityComponent } from './humidity/humidity.component';
import { VisibilityComponent } from './visibility/visibility.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { WeatherEffects } from './effects/weather.effects'
import { DatePipe } from './pipes/date.pipe';
import { AmpmPipe } from './pipes/am-pm.pipe';
import { CelsiusPipe } from './pipes/celsius.pipe';
import { WeekdayPipe } from './pipes/weekday.pipe';
import { FahrenheitPipe } from './pipes/fahrenheit.pipe';
import { UvPipe } from './pipes/uv.pipe';
import { MaxMinTempComponent } from './Max-min-temp/Max-min-temp.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeaturesBoardComponent } from './features-board/features-board.component';
import { PopupComponent } from './popup/popup.component';


@NgModule({
  declarations: [													
    AppComponent,
      LeftBarComponent,
      RightBarComponent,
      ForcastBoardComponent,
      UvIndexComponent,
      MapComponent,
      WindStatusComponent,
      SunStatusComponent,
      HumidityComponent,
      VisibilityComponent,
      DatePipe,
      AmpmPipe,
      CelsiusPipe,
      WeekdayPipe,
      FahrenheitPipe,
      UvPipe,
      MaxMinTempComponent,
      FeaturesBoardComponent,
      PopupComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([WeatherEffects]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
