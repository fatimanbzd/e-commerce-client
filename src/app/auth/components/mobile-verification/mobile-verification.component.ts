import {Component, DestroyRef, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ICustomerRequestLoginModel, IMobileVerificationModel,} from '../../interfaces/login.model';
import {ToastrService} from 'ngx-toastr';
import {NgClass} from '@angular/common';
import {finalize} from 'rxjs';
import {OnlyNumberDirective} from '../../../shared/directives/only-number.directive';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-mobile-verification',
  imports: [ReactiveFormsModule, OnlyNumberDirective, NgClass],
  templateUrl: './mobile-verification.component.html',
  styleUrl: './mobile-verification.component.scss'
})
export class MobileVerificationComponent implements OnInit {
  submitted = false;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private destroyRef:DestroyRef
  ) {
  }

  ngOnInit() {
    this.initForm();
  }

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
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.submitted = false)),
      )
      .subscribe((time) => {
        this.authService.setMobileVerified({

          mobileNumber: this.form.value.mobileNumber,
          waitingTime: time?.waitTime,
        } as IMobileVerificationModel);
      });
  }

  initForm() {
    this.form = this.fb.group({
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
  }
}
