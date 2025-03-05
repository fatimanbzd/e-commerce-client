import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { EnumConvertorUtils } from '@core/Utils/EnumConvertoModel';
import { finalize, map, Subject, switchMap, takeUntil } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { IProductResponseModel } from '../../interfaces/product-response.model';
import {
  FormArray,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { BrandService } from '../../services/brand.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IEnumModel } from '@core/interfaces/enum.model';
import { ProductGuarantyLabel } from '../../../../shared/enums/product-guaranty.enum';

@Component({
    selector: 'app-product-side-bar-filter',
    imports: [NgForOf, NgIf, FormsModule, ReactiveFormsModule],
    templateUrl: './product-side-bar-filter.component.html',
    styleUrl: './product-side-bar-filter.component.scss'
})
export class ProductSideBarFilterComponent implements OnInit, OnDestroy {
  brandList: IEnumModel<number | string>[] = [];
  form!: FormGroup;
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  total = 1;
  listOfData!: IProductResponseModel[];
  private _destroy = new Subject<void>();
  productGuarantyList: IEnumModel<number>[] =
    EnumConvertorUtils.enumToListModel(ProductGuarantyLabel);
  titleFilter = ['گارانتی', 'برند'];
  currentIndex: number = -1;

  private routeData!: any;

  constructor(
    private productService: ProductService,
    private brandService: BrandService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: NonNullableFormBuilder,
  ) {}

  get productGuaranties() {
    return this.form.get('productGuaranties') as FormArray;
  }

  ngOnInit(): void {
    this.handleRouteParams();
    this.getBrands();
    this.initForm();
  }

  private handleRouteParams(): void {
    this.route.queryParams
      .pipe(takeUntil(this._destroy))
      .subscribe((paramMap) => {
        this.routeData = {
          productGuaranties: this.convertToArray(paramMap['productGuaranties']),
          brandIds: this.convertToArray(paramMap['brandIds']),
        };
      });
  }

  private initForm() {
    this.form = this.fb.group({
      productTitle: [],
      productGuaranties: this.fb.array(
        this.productGuarantyList.map((key) =>
          this.routeData.productGuaranties.some(
            (pr: any) => pr.value === key.value,
          ),
        ),
      ),
    });
  }

  private getBrands() {
    this.loading = true;
    return this.brandService
      .brands()
      .pipe(
        takeUntil(this._destroy),
        map((brands) =>
          brands.map(
            (brand) =>
              ({
                value: brand.id,
                name: brand.title,
              }) as IEnumModel<number>,
          ),
        ),
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe((data) => {
        this.handleBrandList(data);
      });
  }

  private handleBrandList(data: IEnumModel<number | string>[]): void {
    this.brandList = data;
    const brandIdsArray = this.brandList?.map((key) =>
      this.routeData.brandIds.some((pr: any) => pr.value === key.value),
    );

    if (brandIdsArray)
      this.form.addControl('brandIds', this.fb.array(brandIdsArray));
  }

  updateFilters(newFilters: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: newFilters,
      queryParamsHandling: 'merge',
    });
  }

  selectGuaranty() {
    const selectedItems = this.form.value.productGuaranties
      .map((checked: any, i: any) =>
        checked ? this.productGuarantyList[i].value : null,
      )
      .filter((v: any) => v !== null);
    this.updateFilters({ productGuaranties: selectedItems });
  }

  selectBrand() {
    const selectedItems = this.form.value.brandIds
      .map((checked: any, i: any) => (checked ? this.brandList[i].value : null))
      .filter((v: any) => v !== null);
    //   this.productService.filterProduct(true);
    this.updateFilters({ brandIds: selectedItems });
  }

  openProperty(index: any) {
    if (this.currentIndex === index) {
      this.currentIndex = -1;
    } else {
      this.currentIndex = index;
    }
  }

  filter() {
    this.route.queryParams
      .pipe(
        takeUntil(this._destroy),
        switchMap((params) => {
          return this.productService.products(params);
        }),
      )
      .subscribe();
  }

  private convertToArray(param: string | number | (string | number)[]) {
    if (Array.isArray(param)) {
      return param.map((item) => ({ value: +item }) as { value: number });
    } else if (param !== undefined && param !== null) {
      return [{ value: +param }];
    } else {
      return [];
    }
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
