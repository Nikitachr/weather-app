import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ampm'
})
export class AmpmPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var time = new Date(value * 1000);
    return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  }

}
