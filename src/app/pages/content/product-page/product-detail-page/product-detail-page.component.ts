import { Component } from '@angular/core';
import { ProductDetailComponent } from '../../../../features/product/components/product-detail/product-detail.component';
import { ProductImageComponent } from '../../../../features/product/components/product-detail/product-image/product-image.component';

@Component({
    selector: 'app-product-specifications-page',
    imports: [ProductImageComponent, ProductDetailComponent],
    templateUrl: './product-detail-page.component.html',
    styleUrl: './product-detail-page.component.scss'
})
export class ProductDetailPageComponent {}
