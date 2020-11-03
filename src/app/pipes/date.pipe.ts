import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var date = `${new Date(value * 1000).getHours()}:00`;
    return date;
  }

}
