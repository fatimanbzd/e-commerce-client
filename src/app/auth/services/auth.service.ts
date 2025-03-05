import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  ICustomerLoginModel,
  ICustomerLoginResponseModel,
  ICustomerRequestLoginModel,
  IMobileVerificationModel,
} from '../interfaces/login.model';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';

import { TokenStorageService } from './token-storage.service';
import { UserInformationStorageService } from './user-information-storage.service';
import {IAuthModel} from "../interfaces/token.model";
import {IUpdateUserProfileModel, IUserModel} from "../interfaces/user.model";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
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
  ) {}

  setAuth(value: boolean) {
    this._authStatusSubject.next(value);
  }

  mobileVerification(
    model: ICustomerRequestLoginModel,
  ): Observable<ICustomerLoginResponseModel> {
    return this.http.post<ICustomerLoginResponseModel>(
      'api/Customers/RequestLogin',
      model,
    );
  }

  otpVerification(model: ICustomerLoginModel): Observable<IAuthModel> {
    return this.http.post<IAuthModel>('api/Customers/Login', model).pipe(
      tap((response) => {
        this.setToken(response);
      }),
    );
  }

  doLoginUser(user: IUserModel) {
    this.setUserAuthenticated(user);
  }

  currentUser(): Observable<IUserModel> {
    return this.http.get<IUserModel>('api/Customers');
  }

  updateUserProfile(profile: IUpdateUserProfileModel): Observable<void> {
    return this.http.put<void>('api/Customers', profile);
  }

  doUpdateUser(user: IUserModel) {
    this.userInformationStorageService.saveUserInformation(user);
    this._profileUpdatedSubject.next(true);
  }

  logout() {
    this.tokenStorageService.removeTokens();
    this.userInformationStorageService.removeUserInformation();
  }

  setUserAuthenticated(value: IUserModel) {
    this.userInformationStorageService.saveUserInformation(value);
  }

  getUserAuthenticated() {
    return this.userInformationStorageService.getUserInformation();
  }

  isLoggedIn() {
    return !!this.tokenStorageService.getAccessToken();
  }

  setToken(auth: IAuthModel) {
    this.tokenStorageService.saveAccessToken(auth);
  }

  setMobileVerified(value: IMobileVerificationModel) {
    this._mobileVerifiedSubject.next(value);
  }
}
