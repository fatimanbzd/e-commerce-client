import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ProductService } from '../../services/product.service';
import { filter, Subject, switchMap, takeUntil } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProductResponseModel } from '../../interfaces/product-response.model';
import { ProductPaginationComponent } from '../product-pagination/product-pagination.component';
import { ProductItemComponent } from '../product-item/product-item.component';

@Component({
    selector: 'app-product-list',
    imports: [
        RouterLink,
        ProductPaginationComponent,
        ProductItemComponent,
    ],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit, OnDestroy {
  productList: IProductResponseModel[] = [];
  totalCount!: number;
  pageSize = 12;
  private readonly _destroy = new Subject<void>();
  @Output() emptyData = new EventEmitter();

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.productService.filterProduct$
      .pipe(takeUntil(this._destroy))
      .subscribe((response) => {
        if (response) this.getProducts();
      });
  }

  getProducts() {
    this.route.queryParams
      .pipe(
        filter((param) => Object.keys(param).length > 0),
        takeUntil(this._destroy),
        switchMap((params) =>
          this.productService.products(params, this.pageSize),
        ),
      )
      .subscribe((products) => {
        this.productList = products.items;
        this.totalCount = products.totalCount;
        if (this.productList.length === 0) this.emptyData.emit();
      });
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
