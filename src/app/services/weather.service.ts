import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WeatherData } from '../models/WeatherData';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

constructor(private http: HttpClient) { }
  getWeather(payload){
    return this.http.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${payload.latitude}&lon=${payload.longitude}&exclude=minutel,alerts&appid=${environment.weatherApi}`)
  }
}
