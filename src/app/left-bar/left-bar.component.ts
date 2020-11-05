import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { LocationService } from '../services/location.service';
import { Store, select } from '@ngrx/store';
import { AppState, selectLocation, selectUnits, selectWeather } from 'src/app/reducers';
import { LoadLocations } from '../actions/location.actions';
import { IconService } from '../services/icon.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { debounceTime, filter, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.scss'],
  animations: [
    
  ]
})
export class LeftBarComponent implements OnInit, AfterViewInit {
  @ViewChild('search', { static: false }) filter: ElementRef;
  data$: Observable<any>;
  data: any;
  location$: Observable<any>;
  loc: any;
  isCelsius$: Observable<boolean>;
  isCelsius: boolean;
  iconId: number;
  Weather: any[];
  keyupSubscription: Subscription;
  searchData: any[] = [];
  
  headers: HttpHeaders = new HttpHeaders ({ "x-rapidapi-key": "e9de7f3e4amshfb24508bb6d4c77p17ae7bjsn28f9fea38a3f",
  "x-rapidapi-host": "wft-geo-db.p.rapidapi.com" });
  dateObj = new Date();
  weekday = this.dateObj.toLocaleString("en-Us", { weekday: "long" })
  constructor(private http: HttpClient, 
    private location: LocationService, 
    private store: Store<AppState>, 
    public icon: IconService) { }
  
  
  
  
  ngOnInit() {
    
    
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
      }, err => console.log(err));   
    } 
    
    this.data$ = this.store.select(selectWeather);
    this.data$.subscribe(res => {
      if (res) {
        this.data = res;
        this.Weather = res.current.weather;
        this.iconId = this.data.current.weather[0].id;
      }
    });

    this.location$ = this.store.select(selectLocation)
    this.location$.subscribe(res => {
      this.loc = res;
    });

    this.isCelsius$ = this.store.select(selectUnits);
    this.isCelsius$.subscribe(res => {
      this.isCelsius = res;
    })
  }

  ngAfterViewInit(){
    this.subscribe();
  }
  
  changeLocation(item: any){
    this.searchData = [];
    this.filter.nativeElement.value = ''
    this.store.dispatch(new LoadLocations({locationData: item}));
    this.subscribe();
  }
  search(value: string){
    return this.http.get(`https://rapidapi.p.rapidapi.com/v1/geo/cities?minPopulation=50000&namePrefix=${value}`, { headers: this.headers });
  }
  
  homeLocation(){
    if(localStorage.getItem('location')){
      this.store.dispatch(new LoadLocations({locationData: JSON.parse(localStorage.getItem('location'))}));
    }
  }
  subscribe(){
    if(this.keyupSubscription){
      this.keyupSubscription.unsubscribe();
    }
    
    this.keyupSubscription = fromEvent(this.filter.nativeElement, 'keyup')
    .pipe(
      debounceTime(1000),
      map((event: Event) => (<HTMLInputElement>event.target).value),
      map(value => value.trim()),
      tap(value => {
        if (value.length <= 0) {
          this.subscribe();
          this.searchData = [];
        }
      }),
      filter(value => value.length > 0),
      distinctUntilChanged(),
      switchMap(value => this.search(value))
    ).subscribe((res: any) => {
      if (res) {
        this.searchData = res.data;
      } else {
        this.searchData = []
      }
    })
  }
}
