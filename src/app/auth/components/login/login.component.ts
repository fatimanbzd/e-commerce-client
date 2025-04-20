import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {MobileVerificationComponent} from '../mobile-verification/mobile-verification.component';
import {
  ICustomerLoginModel,
  IMobileVerificationModel,
} from '../../interfaces/login.model';
import {NgOptimizedImage} from '@angular/common';
import {
  catchError,
  finalize,
  map,
  Subject,
  switchMap,
  takeUntil,
  throwError,
} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {OtpVerificationComponent} from '../otp-verification/otp-verification.component';

@Component({
  selector: 'app-login',
  imports: [
    MobileVerificationComponent,
    OtpVerificationComponent,
    NgOptimizedImage,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  mobileVerification: IMobileVerificationModel = {
    waitingTime: 0,
    mobileNumber: '',
  };
  redirectUrl: string | null = null;
  loading = false;
  private _destroy = new Subject<void>();

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.authService.mobileVerified$
      .pipe(takeUntil(this._destroy))
      .subscribe((response) => {
        this.mobileVerification = response;
      });
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.redirectUrl = params.get('redirectUrl');
    });
  }

  otpResponse(otp: any) {
    if (otp == -2) {
      this.mobileVerification.waitingTime = 0;
      return;
    }

    this.otpVerification(otp);
  }

  otpVerification(otp: string) {
    const model: ICustomerLoginModel = {
      verificationCode: otp,
      mobileNumber: this.mobileVerification.mobileNumber,
    };
    this.authService
      .otpVerification(model)
      .pipe(
        switchMap((auth) => {
          return this.authService.currentUser().pipe(
            map((user) => ({auth, user})),
            takeUntil(this._destroy),
          );
        }),
        catchError((err) => {
          return throwError(() => console.error(err));
        }),
        takeUntil(this._destroy),
        finalize(() => (this.loading = false)),
      )
      .subscribe(({auth, user}) => {
        if (user) {
          this.authService.doLoginUser(user);
          this.authService.setAuth(true);

          if (!user.nationalNumber)
            this.router.navigateByUrl('/checkout/registration');
          else this.router.navigate([this.redirectUrl || '/']);
        }
      });
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
