import {Component} from '@angular/core';
import {ProductDetailComponent} from '../../../../features/product/components/product-detail/product-detail.component';

@Component({
    selector: 'app-product-specifications-page',
  imports: [ProductDetailComponent],
    templateUrl: './product-detail-page.component.html',
    styleUrl: './product-detail-page.component.scss'
})
export class ProductDetailPageComponent {}
