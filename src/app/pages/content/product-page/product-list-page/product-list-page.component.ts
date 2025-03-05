import { Component } from '@angular/core';
import { ProductComponent } from '../../../../features/product/product.component';

@Component({
    selector: 'app-product-list-page',
    imports: [ProductComponent],
    templateUrl: './product-list-page.component.html',
    styleUrl: './product-list-page.component.scss'
})
export class ProductListPageComponent {}
