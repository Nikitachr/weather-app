import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'celsius'
})
export class CelsiusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return `${Math.round(value - 273.15)}°`;
  }

}
