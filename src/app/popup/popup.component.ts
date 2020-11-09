import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { LoadLocations } from '../actions/location.actions';
import { AppState } from '../reducers';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  @ViewChild('search', { static: false }) filter: ElementRef;
  constructor(private http: HttpClient, private location: LocationService, private store: Store<AppState>) { }
  keyupSubscription: Subscription;
  searchData: any[] = [];
  headers: HttpHeaders = new HttpHeaders ({ "x-rapidapi-key": "e9de7f3e4amshfb24508bb6d4c77p17ae7bjsn28f9fea38a3f",
  "x-rapidapi-host": "wft-geo-db.p.rapidapi.com" });
  @Output() onClose = new EventEmitter();
  


  ngOnInit() {
  }
  ngAfterViewInit(){
    this.subscribe();
  }
  changeLocation(item: any){
    this.store.dispatch(new LoadLocations({locationData: item}));
    localStorage.setItem('location', JSON.stringify(item));
    this.keyupSubscription.unsubscribe;
    this.onClose.emit();
  }
  search(value: string){
    return this.http.get(`https://rapidapi.p.rapidapi.com/v1/geo/cities?minPopulation=50000&namePrefix=${value}`, { headers: this.headers });
  }
  subscribe(){
    this.keyupSubscription = fromEvent(this.filter.nativeElement, 'keyup')
    .pipe(
      tap(value => this.searchData = []),
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
