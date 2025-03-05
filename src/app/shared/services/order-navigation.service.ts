import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class OrderNavigationService {
  private completedSteps: Set<string> = new Set();
  private orderData: any = {};
  private isBrowser: boolean;
  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    const storedSteps = this.isBrowser
      ? sessionStorage.getItem('cs--3450')
      : null;
    this.completedSteps = storedSteps
      ? new Set(JSON.parse(storedSteps))
      : new Set();
    const storedOrderData = this.isBrowser
      ? sessionStorage.getItem('orderData')
      : null;
    this.orderData = storedOrderData ? JSON.parse(storedOrderData) : {};
  }

  completeStep(step: string) {
    this.completedSteps.add(step);
    this.saveProgress();
  }

  canActivate(route: string): boolean {
    const stepOrder = ['ship', 'pre-invoice', 'wallet'];
    const stepIndex = stepOrder.indexOf(route);
    for (let i = 0; i < stepIndex; i++) {
      if (!this.completedSteps.has(stepOrder[i])) {
        return false;
      }
    }
    return true;
  }

  clearOrderData() {
    if (this.isBrowser) {
      this.completedSteps.clear();
      this.orderData = {};
      sessionStorage.removeItem('cs--3450');
      sessionStorage.removeItem('orderData');
    }
  }

  private saveProgress() {
    if (this.isBrowser)
      sessionStorage.setItem(
        'cs--3450',
        JSON.stringify(Array.from(this.completedSteps)),
      );
    if (this.isBrowser)
      sessionStorage.setItem('orderData', JSON.stringify(this.orderData));
  }
}
