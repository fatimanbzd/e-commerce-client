import {Inject, Injectable, makeStateKey, PLATFORM_ID, TransferState} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {
  ICustomerLoginModel,
  ICustomerLoginResponseModel,
  ICustomerRequestLoginModel,
  IMobileVerificationModel,
} from '../interfaces/login.model';
import {BehaviorSubject, Observable, of, Subject, tap} from 'rxjs';

import {TokenStorageService} from './token-storage.service';
import {UserInformationStorageService} from './user-information-storage.service';
import {IAuthModel} from "../interfaces/token.model";
import {IUpdateUserProfileModel, IUserModel} from "../interfaces/user.model";
import {isPlatformBrowser} from '@angular/common';

const Request_Login_KEY = makeStateKey<ICustomerLoginResponseModel | null>('requestLogin');
const Login_KEY = makeStateKey<IAuthModel | null>('login');
const User_Info_KEY = makeStateKey<IUserModel | null>('userInfo');
const USER_PROFILE_KEY = makeStateKey<void | null>('userProfile');

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private isBrowser: boolean;
  private _authStatusSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  authStatus$ = this._authStatusSubject.asObservable();

  private _profileUpdatedSubject = new BehaviorSubject<boolean>(false);
  _profileUpdated$ = this._profileUpdatedSubject.asObservable();
  private _mobileVerifiedSubject = new Subject<IMobileVerificationModel>();
  mobileVerified$ = this._mobileVerifiedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private userInformationStorageService: UserInformationStorageService,
    @Inject(PLATFORM_ID) private platformId: object,
    private transferState: TransferState,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  setAuth(value: boolean) {
    this._authStatusSubject.next(value);
  }

  mobileVerification(
    model: ICustomerRequestLoginModel,
  ): Observable<ICustomerLoginResponseModel | null> {
    if (this.transferState.hasKey(Request_Login_KEY)) {
      return of(this.transferState.get<ICustomerLoginResponseModel | null>(Request_Login_KEY, null));
    }

      return this.http.post<ICustomerLoginResponseModel>(
        'api/Customers/RequestLogin',
        model,
      ).pipe(tap(data => this.transferState.set(Request_Login_KEY, data)));

  }

  otpVerification(model: ICustomerLoginModel): Observable<IAuthModel | null> {
    if (this.transferState.hasKey(Login_KEY)) {
      return of(this.transferState.get<IAuthModel | null>(Login_KEY, null));
    }

      return this.http.post<IAuthModel>('api/Customers/Login', model).pipe(
        tap((response) => {
          this.setToken(response);
          this.transferState.set(Login_KEY, response);
        }),
      );
  }

  doLoginUser(user: IUserModel) {
    this.setUserAuthenticated(user);
  }

  currentUser(): Observable<IUserModel | null> {
    if (this.transferState.hasKey(User_Info_KEY)) {
      return of(this.transferState.get<IUserModel | null>(User_Info_KEY, null));
    }

      return this.http.get<IUserModel>('api/Customers').pipe(tap(data =>
        this.transferState.set(User_Info_KEY, data)));

  }

  updateUserProfile(profile: IUpdateUserProfileModel): Observable<void | null> {
    if (this.transferState.hasKey(USER_PROFILE_KEY)) {
      return of(this.transferState.get<void | null>(USER_PROFILE_KEY, null));
    }

      return this.http.put<void>('api/Customers', profile).pipe(
        tap(() => this.transferState.set(USER_PROFILE_KEY, null))
      );
  }

  doUpdateUser(user: IUserModel | null) {
    if (user) {
      this.userInformationStorageService.saveUserInformation(user);
      this._profileUpdatedSubject.next(true);
    }
  }

  logout() {
    this.tokenStorageService.removeTokens();
    this.userInformationStorageService.removeUserInformation();
  }

  setUserAuthenticated(value: IUserModel) {
    this.userInformationStorageService.saveUserInformation(value);
  }

  getUserAuthenticated() {
    if (!this.isBrowser) return null;
    return this.userInformationStorageService.getUserInformation();
  }

  isLoggedIn() {
    if (!this.isBrowser) return false;
    return !!this.tokenStorageService.getAccessToken();
  }

  setToken(auth: IAuthModel) {
    this.tokenStorageService.saveAccessToken(auth);
  }

  setMobileVerified(value: IMobileVerificationModel) {
    this._mobileVerifiedSubject.next(value);
  }
}
