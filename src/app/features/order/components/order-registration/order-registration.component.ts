import { Component, DestroyRef, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OnlyNumberDirective } from '@core/directives/only-number.directive';
import { IUserModel } from '@core/interfaces/user.model';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../../shared/services/cart.service';
import { OrderNavigationService } from '../../../../shared/services/order-navigation.service';
import { Utilities } from '@core/Utils/utilities';
import { IUpdateUserProfileModel } from '../../../../shared/interfaces/user.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-order-registration',
  imports: [FormsModule, OnlyNumberDirective, ReactiveFormsModule],
  templateUrl: './order-registration.component.html',
  styleUrl: './order-registration.component.scss',
})
export class OrderRegistrationComponent implements OnInit {
  submitted = false;
  user!: IUserModel | null;
  form!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService,
    private fb: FormBuilder,
    private toastService: ToastrService,
    private orderNavigationService: OrderNavigationService,
    private destroyRef: DestroyRef,
  ) {
    this.registered();
  }

  ngOnInit() {
    this.initForm();
  }

  registered() {
    this.cartService.registered$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.update());
  }

  initForm() {
    this.user = this.authService.getUserAuthenticated();
    this.form = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      family: [null, Validators.required],
      mobileNumber: [this.user?.mobileNumber, Validators.required],
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
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: () => {
          this.orderNavigationService.completeStep('registration');
          if (this.user)
            this.authService.doUpdateUser({
              mobileNumber: this.user.mobileNumber,
              ...this.form.value,
            } as IUserModel);
          this.toastService.success('ثبت نام با موفقیت انجام شد');
          this.router.navigateByUrl('/pages/content/order/ship');
        },
      });
  }
}
