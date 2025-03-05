import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {
  ICustomerRequestLoginModel,
  IMobileVerificationModel,
} from '../../interfaces/login.model';
import { OnlyNumberDirective } from '@core/directives/only-number.directive';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';
import { finalize, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-mobile-verification',
    imports: [ReactiveFormsModule, OnlyNumberDirective, NgClass],
    templateUrl: './mobile-verification.component.html',
    styleUrl: './mobile-verification.component.scss'
})
export class MobileVerificationComponent implements OnDestroy {
  submitted = false;
  form = this.fb.group({
    mobileNumber: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '^(?:(?:(?:\\\\+?|00)(98))|(0))?((?:90|91|92|93|99)[0-9]{8})$',
        ),
        Validators.maxLength(11),
      ],
    ],
  });

  private _destroy = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
  ) {}

  submitForm(): void {
    this.submitted = true;
    if (this.form.invalid) {
      this.toastrService.error('لطفا موبایل را وارد کنید');
      this.submitted = false;
      return;
    }

    this.authService
      .mobileVerification(this.form.value as ICustomerRequestLoginModel)
      .pipe(
        takeUntil(this._destroy),
        finalize(() => (this.submitted = false)),
      )
      .subscribe((time) => {
        this.authService.setMobileVerified({
          mobileNumber: this.form.value.mobileNumber,
          waitingTime: time.waitTime,
        } as IMobileVerificationModel);
      });
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
