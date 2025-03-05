import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(@Inject('environment') private environment: any) {}

  getEnvironment(): any {
    return this.environment;
  }

  /**
   * Indicates whether the apps is running in production mode
   *
   * @return {*}  {boolean}
   */
  isProd(): boolean {
    return this.environment.production;
  }

  /**
   * Returns app's version
   */
  getVersion(): string {
    return this.environment.appVersion;
  }

  /**
   * Returns the server's host url
   */
  getAPIUrl(): string {
    return this.environment?.apiUrl ?? '';
  }

  /**
   * Returns configuration for auth client and secret
   */
  getAuthSettings(): any['settings']['auth'] {
    return this.environment?.settings?.auth;
  }
}
