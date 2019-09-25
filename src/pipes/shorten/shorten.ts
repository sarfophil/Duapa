import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ShortenPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'shorten',
})
export class ShortenPipe  {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value, maxWidth = 30, suffix = '...') {
      if (value && value.length > maxWidth) {
          value = value.substring(0, maxWidth) + suffix;
      }
      return value;
  }
}
