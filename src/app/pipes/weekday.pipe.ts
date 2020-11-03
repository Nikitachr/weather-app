import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weekday'
})
export class WeekdayPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let dateObj = new Date(value * 1000);
    return dateObj.toLocaleString("en-Us", { weekday: "short" });
  }

}
