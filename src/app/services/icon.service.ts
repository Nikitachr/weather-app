import { Injectable } from '@angular/core';
import thundrstorm from '../../assets/imgs/thunderstrom.svg';
import drizzle from '../../assets/imgs/drizzle.svg';
import rainsun from '../../assets/imgs/rainsun.svg';
import rainsnow from '../../assets/imgs/rainsnow.svg';
import rain from '../../assets/imgs/rain.svg';
import lightsnow from '../../assets/imgs/lightsnow.svg';
import snow from '../../assets/imgs/snow.svg';
import fog from '../../assets/imgs/fog.svg';
import tornado from '../../assets/imgs/tornado.svg';
import sun from '../../assets/imgs/sun.svg';
import cloudsun from '../../assets/imgs/cloudsun.svg';
import clouds from '../../assets/imgs/clouds.svg';
import mostlyclouds from '../../assets/imgs/mostlyclouds.svg';

@Injectable({
  providedIn: 'root'
})
export class IconService {

constructor() { }
getWeatherImg(weatherId: number): any{
  if(weatherId >= 200 && weatherId <= 232){ return thundrstorm; }
  if(weatherId >= 300 && weatherId <= 321){ return drizzle; }
  if(weatherId >= 500 && weatherId <= 504){ return rainsun; }
  if(weatherId == 511){  return rainsnow; }
  if(weatherId >= 520 && weatherId <= 531){ return rain; }
  if(weatherId == 600){ return lightsnow; }
  if(weatherId >= 601 && weatherId <= 602){ return snow; }
  if(weatherId >= 611 && weatherId <= 622){ return rainsnow; }
  if(weatherId >= 701 && weatherId <= 771){ return fog; }
  if(weatherId == 781){ return tornado; }
  if(weatherId == 800){ return sun; }
  if(weatherId == 801){ return cloudsun; }
  if(weatherId == 802){ return clouds; }
  if(weatherId >= 803 && weatherId <= 804){ return mostlyclouds; }
}
}
