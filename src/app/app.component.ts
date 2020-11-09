import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, selectLocation, selectUnits, selectWeather } from 'src/app/reducers';
import { LoadLocations } from './actions/location.actions';
import { LocationService } from './services/location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'WeatherApp';
  isPopup: boolean = false;

  constructor(private http: HttpClient, private location: LocationService, private store: Store<AppState>) { }

  ngOnInit(){
    if(localStorage.getItem('location')){
      this.store.dispatch(new LoadLocations({locationData: JSON.parse(localStorage.getItem('location'))}));
    } else {
      this.http.get("https://api.ipify.org/?format=json").subscribe(ip => {
        this.location.getLocation(ip).subscribe((res: any) => {
        var loc = res.loc.split(',');
        var location = {
          city: res.city,
          country: res.country,
          latitude: loc[0],
          longitude: loc[1]
        };
         localStorage.setItem('location', JSON.stringify(location));
          this.store.dispatch(new LoadLocations({locationData: location}));
        }, err => console.log(err));
      }, (err) => this.showPopup());  
    } 
  }
  showPopup(){
    this.store.dispatch(new LoadLocations({locationData: {
      city: `Kyiv`,
      country: `Ukraine`,
      latitude: `50.4547`,
      longitude: `30.5238`
    }}));
    this.isPopup = true;
  }
  closePopup(){
    console.log(`it's ok`)
    this.isPopup = false;
  }
}
