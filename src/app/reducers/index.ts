import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { LocationAction, LocationActionTypes } from '../actions/location.actions';
import { WeatherAction, WeatherActionTypes } from '../actions/weather.actions';
import { WeatherData } from '../models/WeatherData';


export interface WeatherState {
  weatherData: any | null;
  isCelsius: boolean
}

const initialWeatherState: WeatherState = {
  weatherData: null,
  isCelsius: true
};

export interface LocationState {
  location: any | null;
  error: string| null;
}

const initialLocationState: LocationState = {
  location: null,
  error: null
};

export interface AppState {
  weather: WeatherState;
  location: LocationState;
}

export function weatherReducer(state: WeatherState = initialWeatherState, action: WeatherAction): WeatherState {
  switch (action.type) {
    case WeatherActionTypes.LoadWeather:
      return {
        weatherData: action.payload.weatherData,
        isCelsius: state.isCelsius
      };
    case WeatherActionTypes.ChangeUnits:
      return{
        weatherData: state.weatherData,
        isCelsius: action.payload.isCelsius
      }  
    default:
      return state;
  }
}

export function locationReducer(state: LocationState = initialLocationState, action: LocationAction): LocationState {
  switch (action.type) {
    case LocationActionTypes.LoadLocations:
      return {
        location: action.payload.locationData,
        error: null
      };

    case LocationActionTypes.LocationsError:
      return {
        location: null,
        error: action.payload.error
      };

    default:
      return state;
  }
}

export const reducers: ActionReducerMap<AppState> = {

  weather: weatherReducer,
  location: locationReducer
};

export const selectWeather = (state: AppState) => state.weather.weatherData;

export const selectUnits = (state: AppState) => state.weather.isCelsius;

export const selectLocation = (state: AppState) => state.location.location;

export const selectError = (state: AppState) => state.location.error;

export const metaReducers: MetaReducer<any>[] = !environment.production ? [] : [];