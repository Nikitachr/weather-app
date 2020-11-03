import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fahrenheit'
})
export class FahrenheitPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return `${Math.round(value * 9/5 - 459.67)}°`;
  }

}
