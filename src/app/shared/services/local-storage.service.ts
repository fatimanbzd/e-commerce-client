import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  /**
   * Sets item in local storage
   *
   * @param {string} key
   * @param {unknown} value
   */
  setItem(key: string, value: unknown) {
    try {
      if (this.isBrowser)
        localStorage.setItem(`QLand-token-${key}`, JSON.stringify(value));
    } catch (e) {
      if (this.isBrowser)
        localStorage.setItem(`QLand-token-${key}`, value as string);
    }
  }

  /**
   * Gets item from local storage by key
   *
   * @param {string} key
   * @return {*}  {unknown}
   */
  getItem(key: string): unknown {
    try {
      if (this.isBrowser) {
        const value = localStorage.getItem(`QLand-token-${key}`);
        return JSON.parse(value as string);
      } else return null;
    } catch (e) {
      if (this.isBrowser) {
        const value = localStorage.getItem(`QLand-token-${key}`);
        return JSON.parse(value as string);
      }
      return null;
    }
  }

  /**
   * Removes item from local storage by key
   *
   * @param {string} key
   */
  removeItem(key: string) {
    if (this.isBrowser) localStorage.removeItem(`QLand-token-${key}`);
  }
}
