import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {Router} from '@angular/router';
import {IBestSellingProductModel} from '../../../../interfaces/bestSellingProduct.model';
import {BestSellingProductService} from '../../../../services/best-selling-product.service';
import {ProductItemComponent} from '../../../product-item/product-item.component';

@Component({
    selector: 'app-products-bar',
  imports: [ProductItemComponent],
    templateUrl: './products-bar.component.html',
    styleUrl: './products-bar.component.scss'
})
export class ProductsBarComponent implements OnInit, OnDestroy {
  bestSellingProductList: IBestSellingProductModel[] = [];
  x = 0;
  count: number = this.bestSellingProductList.length;
  counterRevers: number = 0;
  showRightIcon: boolean = false;

  private readonly _destroy = new Subject<void>();

  constructor(
    private bestSellingProduct: BestSellingProductService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getBestSellingProduct();
    this.showRightIcon = false;
  }

  getBestSellingProduct() {
    return this.bestSellingProduct
      .bestSellingProduct()
      .pipe(takeUntil(this._destroy))
      .subscribe((data) => {
        this.bestSellingProductList = data;
        this.count = this.bestSellingProductList.length;
      });
  }

  moveLeft() {
    if (this.count - 5 > 0) {
      this.x += 267;
      this.count--;
      this.counterRevers++;

      this.showRightIcon = true;
    }
  }

  moveRight() {
    if (this.counterRevers > 0) {
      this.x -= 267;
      this.count++;
      this.counterRevers--;

      if (this.counterRevers === 0) {
        this.showRightIcon = false;
      }
    }
  }

  goToCProductSpecifications(item: IBestSellingProductModel) {
    this.router.navigateByUrl(
      `/pages/content/products/${item.id}/${item.title}`,
    );
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
