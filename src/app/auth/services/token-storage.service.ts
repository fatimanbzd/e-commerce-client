import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import {IEnvironmentModel} from "../../shared/interfaces/environment.model";
import {IAuthModel} from "../interfaces/token.model";
import {ConfigService} from '../../shared/config/config.service';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  private tokenInfo: string;
  private isBrowser: boolean;
  constructor(
    private configService: ConfigService,
    private localStorageService: LocalStorageService,
    @Inject('environment') private environment: IEnvironmentModel,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    const authSettings = this.configService.getAuthSettings();
    this.tokenInfo = this.environment.settings.auth.accessToken;
    //this.refreshTokenKey = authSettings.refreshTokenKey || 'refreshToken';
  }

  getAccessToken(): IAuthModel | null {
    return this.isBrowser
      ? (this.localStorageService.getItem(this.tokenInfo) as IAuthModel)
      : null;
  }

  saveAccessToken(auth: IAuthModel) {
    if (this.isBrowser) this.localStorageService.setItem(this.tokenInfo, auth);
  }

  // getRefreshToken(): string {
  //   return this.localStorageService.getItem(this.refreshTokenKey) as string;
  // }

  // saveRefreshToken(token: string) {
  //   this.localStorageService.setItem(this.refreshTokenKey, token);
  // }
  removeTokens() {
    if (this.isBrowser) this.localStorageService.removeItem(this.tokenInfo);
    // this.localStorageService.removeItem(this.refreshTokenKey);
  }
}
