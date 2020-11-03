import { Action } from '@ngrx/store';
import { WeatherData } from '../models/WeatherData';

export enum WeatherActionTypes {
  LoadWeather = '[Home Page] Load Weather',
  ChangeUnits = '[Home Page] Change Units'
}

export class WeatherAction implements Action {
  type: string;
  payload: {
    weatherData: any,
    isCelsius: boolean
  };
}

export class LoadWeather implements Action {
  readonly type = WeatherActionTypes.LoadWeather;

  constructor(readonly payload: {weatherData: any}) {

  }
}
export class ChangeUnits implements Action {
  readonly type = WeatherActionTypes.ChangeUnits;

  constructor(readonly payload: {isCelsius: boolean}) {

  }
}

export type WeatherActions = LoadWeather;