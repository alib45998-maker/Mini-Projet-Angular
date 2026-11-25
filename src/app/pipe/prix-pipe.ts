import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prix',
})
export class PrixPipe implements PipeTransform {
  transform(valeur: number): string {
    return valeur.toFixed(2) + ' DT';
  }
}
