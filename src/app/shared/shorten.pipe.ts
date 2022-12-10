import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  transform(value: string, limit: number = 20): string {
    if (value.length > limit) {
      return `${value.substring(0, limit - 3)}...`;
    }

    return value;
  }
}
