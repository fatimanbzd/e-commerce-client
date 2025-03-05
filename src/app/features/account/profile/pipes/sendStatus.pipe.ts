import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'sendStatus',
})
export class sendStatus implements PipeTransform {
  transform(value: any): any {
    switch (value) {
      case 0:
        return 'درحال بررسی';
      case 1:
        return 'تایید شده';
      case 2:
        return 'منتظر ارسال';
      case 3:
        return 'ارسال شده';
      case 4:
        return 'تحویل داده شده';
      case 5:
        return 'عدم تامین';
    }

    return '-';
  }
}
