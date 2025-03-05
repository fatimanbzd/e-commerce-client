import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import {IEnvironmentModel} from '../../shared/interfaces/environment.model';
import {IUserModel} from '../interfaces/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserInformationStorageService {
  private readonly information: string;
  private isBrowser: boolean;
  constructor(
    private localStorageService: LocalStorageService,
    @Inject('environment') private environment: IEnvironmentModel,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.information = this.environment.settings.auth.userInformation;
  }

  getUserInformation(): IUserModel | null {
    return this.isBrowser
      ? (this.localStorageService.getItem(this.information) as IUserModel)
      : null;
  }

  saveUserInformation(user: IUserModel) {
    if (this.isBrowser)
      this.localStorageService.setItem(this.information, user);
  }

  removeUserInformation() {
    if (this.isBrowser) this.localStorageService.removeItem(this.information);
  }
}
