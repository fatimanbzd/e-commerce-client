import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';

import { ICustomerRequestLoginModel } from '../../interfaces/login.model';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import {DigitNumberDirective} from '../../../shared/directives/digit-number.directive';
import {IMobileVerificationResponseModel} from '../../../shared/interfaces/otp.model';

@Component({
    selector: 'core-otp-verification',
    imports: [DigitNumberDirective],
    templateUrl: './otp-verification.component.html',
    styleUrl: './otp-verification.component.scss'
})
export class OtpVerificationComponent implements AfterViewInit, OnDestroy {
  displayTimer!: string;
  displayResend = false;
  displayBtn = false;
  specialKeycodes: { [key: string]: number } = {
    CapsLock: 20,
    ControlLeft: 17,
    ControlRight: 17,
    ShiftLeft: 16,
    ShiftRight: 16,
    AltLeft: 18,
    AltRight: 18,
    Escape: 27,
    Backquote: 192,
    ArrowUp: 38,
    Space: 32,
    ArrowDown: 40,
    Delete: 46,
    Insert: 45,
    End: 35,
    Home: 36,
    PageDown: 34,
    ArrowRight: 39,
    WakeUp: 83, // Note: This keycode might vary depending on the browser and system
  };
  keycodesArray: number[] = Object.values(this.specialKeycodes);
  private readonly _destroy = new Subject<void>();
  @Input() loading = false;
  @Input() isAlphanumeric!: boolean;
  @Input() mobileVerificationResponse!: IMobileVerificationResponseModel;
  @Output() otpOut = new EventEmitter();
  @ViewChild('otp') otpVal!: ElementRef;

  constructor(private authService: AuthService) {}

  ngAfterViewInit() {
    this.timer(this.mobileVerificationResponse.waitingTime);
  }

  nextDigit(event: any, next: any, previous: any, current: any) {
    const value = event.target.value;
    if (this.keycodesArray.includes(event.keyCode)) {
      return;
    }
    if (!this.isBackspace(event.keyCode) && isNaN(event.keyCode)) {
      current.value = '';
      return;
    }
    if (this.isBackspace(event.keyCode)) {
      if (current.value !== '' && previous) {
        current.value = '';
        previous.focus();
      } else if (previous) {
        // previous.value = '';
        previous.focus();
      } else {
        current.value = '';
      }
    } else if (!this.isBackspace(value)) {
      if (value.length === 1) {
        if (event.getModifierState('CapsLock')) {
          current.value = value.toUpperCase();
        } else {
          current.value = value;
        }
      }

      if (next) {
        next.focus();
      }
    }
    this.returnOtp();
  }

  returnOtp() {
    let otp = '';
    Array.from(this.otpVal.nativeElement.children).forEach((child: any) => {
      otp += child.value || '';
    });
    if (otp.length === 5) {
      this.displayBtn = true;
      this.otpVal.nativeElement.focus();
      this.otpOut.emit(otp);
    } else {
      this.displayBtn = false;
    }
  }

  login() {
    let otp = '';
    Array.from(this.otpVal.nativeElement.children).forEach((child: any) => {
      otp += child.value || '';
    });
    this.loading = true;
  }

  otpReSend() {
    const model: ICustomerRequestLoginModel = {
      mobileNumber: this.mobileVerificationResponse.mobileNumber,
    };
    this.authService
      .mobileVerification(model)
      .pipe(takeUntil(this._destroy))
      .subscribe(() => this.timer(this.mobileVerificationResponse.waitingTime));
  }

  changeMobile() {
    this.otpOut.emit(-2);
  }

  private timer(seconds: number) {
    this.displayResend = false;

    const interval = 1000; // Interval in milliseconds
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;

    const formatNumber = (num: number): string =>
      num < 10 ? `0${num}` : `${num}`;

    const updateTimer = () => {
      const displayMinutes = formatNumber(minutes);
      const displaySeconds = formatNumber(remainingSeconds);

      this.displayTimer = `${displayMinutes}:${displaySeconds}`;

      if (seconds <= 0) {
        clearInterval(timerId);
        this.displayResend = true;
      } else {
        seconds--;
        if (remainingSeconds > 0) {
          remainingSeconds--;
        } else {
          minutes--;
          remainingSeconds = 59;
        }
      }
    };
    updateTimer(); // Initial update

    const timerId = setInterval(updateTimer, interval); // Start timer

    return timerId;
  }

  private isBackspace = (key: number) => {
    return key === 8;
  };

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
