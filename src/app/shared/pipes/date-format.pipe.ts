import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {
  transform(value: Date): string {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric', // Incluye el año completo
      month: 'long', // Muestra el nombre completo del mes
      day: '2-digit', // Asegura que el día tenga siempre dos dígitos
    }).format(new Date(value)); // Aplica el formato a la fecha proporcionada
  }
}
