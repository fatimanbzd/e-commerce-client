import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import {AuthService} from '../../../../../auth/services/auth.service';
import {IUpdateUserProfileModel, IUserModel} from '../../../../../auth/interfaces/user.model';
import {finalize, Subject, takeUntil} from 'rxjs';

import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {OnlyNumberDirective} from '../../../../../shared/directives/only-number.directive';
import {Utilities} from '../../../../../shared/Utils/utilities';

@Component({
  selector: 'admin-profile-update',
  imports: [ReactiveFormsModule, OnlyNumberDirective],
  templateUrl: './profile-update.component.html',
  styleUrl: './profile-update.component.scss',
})
export class ProfileUpdateComponent implements OnInit, OnDestroy {
  submitted = false;
  user!: IUserModel | null;
  form!: FormGroup;
  private _destroy = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastrService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.initForm();
    this.user = this.authService.getUserAuthenticated();
    this.form.patchValue({ ...this.user });
  }

  initForm(){
    this.form = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      family: [null, Validators.required],
      mobileNumber: [{ value: null, disabled: true }, Validators.required],
      nationalNumber: [null, Validators.required],
    });
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
