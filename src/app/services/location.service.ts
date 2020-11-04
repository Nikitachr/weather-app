import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

constructor(private http: HttpClient) { }
  

  getLocation(ip: any){
    return this.http.get(`https://api.ipapi.com/${ip.ip}?access_key=${environment.ipApi}&format=1`)
  }
}
