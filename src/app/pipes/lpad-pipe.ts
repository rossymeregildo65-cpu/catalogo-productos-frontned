import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lpad',
})
export class LpadPipe implements PipeTransform {

  transform(value: string | number, length: number, padChar: string = '0'): string {
  
    if (value == null || value == undefined) {
      return '';
    }

    const str: string = value.toString();

    if (str.length >= length) {
      return str;
    }

    return padChar.repeat(length - str.length) + str;
  }

}
