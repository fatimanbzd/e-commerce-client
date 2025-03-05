import { Component, OnDestroy, OnInit } from '@angular/core';

import {
  IProductSpecificationsModel,
  specifications,
} from '../../interfaces/productSpecifications.model';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductPriceComponent } from './product-price/product-price.component';
import { ProductService } from '../../services/product.service';
import { ProductImageComponent } from './product-image/product-image.component';
import { ProductSpecificationsComponent } from './product-specifications/product-specifications.component';
import {NgClass} from '@angular/common';
import { ProductCommentsComponent } from './product-comments/product-comments.component';
import { QuestionAnswerComponent } from './question-answer/question-answer.component';
import { ProductsRelatedBarComponent } from './products-related-bar/products-related-bar.component';

@Component({
  selector: 'app-parent-product-specification',
  imports: [
    ProductImageComponent,
    ProductPriceComponent,
    ProductSpecificationsComponent,
    ProductCommentsComponent,
    QuestionAnswerComponent,
    ProductsRelatedBarComponent,
    ProductPriceComponent,
    NgClass,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  data!: IProductSpecificationsModel;
  state: string = 'specifications';
  productId!: number;
  specs!: specifications[];
  private readonly _destroy = new Subject<void>();

  constructor(
    private productSpecService: ProductService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        switchMap((params) => {
          const id = params['id'];
          this.productId = +id;
          return this.productSpecService.productSpecifications(+id);
        }),
        takeUntil(this._destroy),
      )
      .subscribe((data) => {
        this.data = data;

        this.specs = data.productSpecifications
          .flatMap((f) => f.specifications)
          .filter((spec) => spec.isSpecial);
      });
  }

  changeState(state: string) {
    this.state = state;
    switch (this.state) {
      case 'comments':
        break;
      case 'question-answer':
        break;
      case 'specifications':
        break;
    }
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
