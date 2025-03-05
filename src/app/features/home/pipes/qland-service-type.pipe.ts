import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'qlandServiceType',
})
export class qlandServiceType implements PipeTransform {
  transform(value: any): any {
    switch (value) {
      case 1:
        return 'کیوکالا';
      case 2:
        return 'کیوسفر';
      case 3:
        return 'کیوآموز';
    }

    return '-';
  }
}
