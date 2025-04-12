import {Component} from '@angular/core';

import {CategoryBoxComponent} from '../../../features/home/components/category-box/category-box.component';
import {
  PopularIntroductionComponent
} from '../../../features/home/components/popular-introduction/popular-introduction.component';
import {
  BestSellingProductsComponent
} from '../../../features/product/components/product-detail/best-selling-products/best-selling-products.component';
import {CarouselComponent} from '../../../features/home/components/carousel/carousel.component';

@Component({
    selector: 'app-home-page',
  imports: [
    BestSellingProductsComponent,
    CategoryBoxComponent,
    PopularIntroductionComponent,
    BestSellingProductsComponent,
    CarouselComponent,
  ],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.css'
})
export class HomePageComponent {}
