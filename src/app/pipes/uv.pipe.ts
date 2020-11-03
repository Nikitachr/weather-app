import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round'
})
export class UvPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return Math.round(value);
  }

}
