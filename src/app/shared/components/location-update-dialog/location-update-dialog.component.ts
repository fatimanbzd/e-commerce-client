import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  combineLatest,
  finalize,
  map,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { LocationService } from '../../services/location.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ILocationModel } from '../../interfaces/location.model';
import { ToastrService } from 'ngx-toastr';


import { NgbActiveModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { NgClass } from '@angular/common';
import { ICityModel, IProvinceModel } from '../../interfaces/general.model';
import { GeneralService } from '../../services/general.service';
import {OnlyNumberDirective} from "../../directives/only-number.directive";


@Component({
  selector: 'app-location-update-dialog',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    OnlyNumberDirective,
    NgbTooltip,
    NgClass,
  ],
  templateUrl: './location-update-dialog.component.html',
  styleUrl: './location-update-dialog.component.scss',
})
export class LocationUpdateDialogComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  provinceList!: IProvinceModel[];
  cityList!: ICityModel[];
  @Input() id!: number;
  submitted: boolean = false;

  private readonly _destroy = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService,
    private generalService: GeneralService,
    private toastService: ToastrService,
    public activeModal: NgbActiveModal,
  ) {}

  ngOnInit() {
    this.initForm();
    this.getData();
  }

  initForm() {
    this.form = this.fb.group({
      title: [null, Validators.required],
      provinceCode: [null, Validators.required],
      cityCode: [{ value: null, disabled: true }, Validators.required],
      postalCode: [
        null,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      address: [null, Validators.required],
    });
  }

  getData() {
    if (this.id)
      this.locationService
        .location(this.id)
        .pipe(
          switchMap((location) => {
            return combineLatest([
              this.generalService.provinces(),
              this.generalService.citiesByProvinceCode(location.provinceCode),
            ]).pipe(
              map(([provinces, cities]) => ({
                provinces,
                cities,
                location,
              })),
            );
          }),
          takeUntil(this._destroy),
        )
        .subscribe(({ provinces, cities, location }) => {
          this.provinceList = provinces;
          this.cityList = cities;
          this.form.patchValue({ ...location });
        });
    else
      this.generalService
        .provinces()
        .pipe(takeUntil(this._destroy))
        .subscribe((provinces) => (this.provinceList = provinces));
  }

  getCities(target: any) {
    this.cityList = [];

    this.generalService
      .citiesByProvinceCode(target.value)
      .pipe(
        takeUntil(this._destroy),
        finalize(() => this.checkCityControl()),
      )
      .subscribe((cities) => {
        this.cityList = cities;
      });
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      Utilities.checkValidation(this.form);
      return;
    }

    const subscribtion = this.id
      ? this.locationService.update(this.form.value as ILocationModel, this.id)
      : this.locationService.add(this.form.value as ILocationModel);

    subscribtion
      .pipe(
        takeUntil(this._destroy),
        finalize(() => (this.submitted = false)),
      )
      .subscribe({
        next: () => {
          const message = this.id ? 'عملیات بروزرسانی شد' : 'اطلاعات ذخیره شد';
          this.toastService.success(message);
          this.locationService.setLocationUpdated();
          this.activeModal.close(true);
        },
      });
  }

  checkCityControl() {
    const cityCodeControl = this.form.controls['cityCode'];
    cityCodeControl?.setValue(null);
    if (cityCodeControl) {
      if (
        this.form.controls['provinceCode']?.invalid ||
        this.cityList.length == 0
      ) {
        cityCodeControl.disable();
      } else {
        cityCodeControl.enable();
      }
    }
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
