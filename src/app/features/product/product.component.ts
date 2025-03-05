import { Component } from '@angular/core';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductSideBarFilterComponent } from './components/product-side-bar-filter/product-side-bar-filter.component';
import { ProductSortFilterComponent } from './components/product-sort-filter/product-sort-filter.component';

@Component({
    selector: 'app-product',
    imports: [
        ProductListComponent,
        ProductSideBarFilterComponent,
        ProductSortFilterComponent,
    ],
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss'
})
export class ProductComponent {
  emptyData = false;

  setEmptyData() {
    this.emptyData = true;
  }
}
