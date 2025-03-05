import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../../shared/services/auth.service';
import { IUpdateUserProfileModel } from '../../../../../shared/interfaces/user.model';
import { finalize, Subject, takeUntil } from 'rxjs';
import { OnlyNumberDirective } from '@core/directives/only-number.directive';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { IUserModel } from '@core/interfaces/user.model';
import { Utilities } from '@core/Utils/utilities';

@Component({
  selector: 'admin-profile-update',
  imports: [ReactiveFormsModule, OnlyNumberDirective, NgClass],
  templateUrl: './profile-update.component.html',
  styleUrl: './profile-update.component.scss',
})
export class ProfileUpdateComponent implements OnInit, OnDestroy {
  submitted = false;
  user!: IUserModel | null;
  form: FormGroup = this.fb.group({
    id: [null],
    name: [null, Validators.required],
    family: [null, Validators.required],
    mobileNumber: [{ value: null, disabled: true }, Validators.required],
    nationalNumber: [null, Validators.required],
  });
  private _destroy = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastrService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.user = this.authService.getUserAuthenticated();
    this.form.patchValue({ ...this.user });
  }

  update() {
    this.submitted = true;
    if (this.form.invalid) {
      Utilities.checkValidation(this.form);
      this.submitted = false;
      return;
    }
    const model: IUpdateUserProfileModel = this.form.value;
    this.authService
      .updateUserProfile(model)
      .pipe(
        finalize(() => (this.submitted = false)),
        takeUntil(this._destroy),
      )
      .subscribe({
        next: () => {
          this.authService.doUpdateUser({
            mobileNumber: this.user?.mobileNumber,
            ...this.form.value,
          } as IUserModel);
          this.toastService.success('اطلاعات کاربری با موفقیت ذخیره شد');
          this.router.navigateByUrl('/user-profile');
        },
      });
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
