import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'excerpt'
})
export class ExcerptPipe implements PipeTransform {
  transform(value: string, limit?: number): string {
    const limitNumber = (limit) ? limit : 50;
    if (!value) {
      return null;
    }
    if (value.length < limitNumber) {
      return value;
    }
    return value.substr(0, limitNumber) + '...';
  }
}
