import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState, selectLocation } from 'src/app/reducers';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as L from 'leaflet';
import {fromLonLat} from 'ol/proj';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  location$: Observable<any>
  loc: any;
  layer: string = 'temp_new';
  map;
  
  templayer = L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${environment.weatherApi}`, {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' });
  defaultlayer = L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' });
  cloudslayer = L.tileLayer(`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${environment.weatherApi}`, {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' });
  windlayer = L.tileLayer(`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${environment.weatherApi}`, {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' });

  temp = L.layerGroup([this.templayer, this.defaultlayer]);

  constructor(private store: Store<AppState>, private http: HttpClient) { }

  ngOnInit() {
    this.location$ = this.store.select(selectLocation)
    
    this.location$.subscribe(res => { 
      if (res) {
        this.loc = res;
        if(this.map){
          this.map.remove();
        }
        this.mapInitialize(); 
      }
    })
   

  }
  
  mapInitialize(){
    //this.map = L.map('map').setView([this.loc.latitude, this.loc.longitude], 10);
    
    var baseMaps = {
      "temp": this.templayer,
      'default': this.defaultlayer
  };
  
  var overlayMaps = {
      "default": this.defaultlayer
  };
    this.map = L.map('map', {
      center: [this.loc.latitude,this.loc.longitude],
      zoom: 9,
      layers: [this.defaultlayer, this.templayer]
    });
    
    //L.control.layers(baseMaps).addTo(this.map);
  }
  
}
