import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IProductRelatedModel } from '../../../interfaces/productRelated.model';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import { ProductItemComponent } from '../../product-item/product-item.component';

@Component({
    selector: 'app-products-related-bar',
    imports: [ProductItemComponent],
    templateUrl: './products-related-bar.component.html',
    styleUrl: './products-related-bar.component.scss'
})
export class ProductsRelatedBarComponent implements OnDestroy, OnChanges {
  private readonly _destroy = new Subject<void>();
  @Input() productId: number | undefined;
  dataRelated: IProductRelatedModel[] = [];

  x = 0;
  count: number = 0;
  counterRevers: number = 0;
  showRightIcon: boolean = false;

  constructor(
    private product: ProductService,
    private router: Router,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productId'] !== undefined) {
      this.loadData();
    }
  }

  loadData() {
    if (this.productId) {
      this.getProductRelated(this.productId);
    }

    this.showRightIcon = false;
  }

  getProductRelated(pi: number) {
    return this.product
      .productRelated(pi)
      .pipe(takeUntil(this._destroy))
      .subscribe((data: any) => {
        this.dataRelated = data;
        this.count = this.dataRelated?.length || 0;
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

  goToCProductSpecifications(item: IProductRelatedModel) {
    this.router
      .navigate([`/pages/content/products/${item.id}/${item.title}`])
      .then(() => {
        window.location.reload();
      });
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
