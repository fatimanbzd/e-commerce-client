import { Component } from '@angular/core';

import { CategoryBoxComponent } from '../../../features/home/components/category-box/category-box.component';
import { PopularIntroductionComponent } from '../../../features/home/components/popular-introduction/popular-introduction.component';
import { SliderComponent } from '../../../features/home/components/slider/slider.component';
import { BestSellingProductsComponent } from '../../../features/product/components/product-detail/best-selling-products/best-selling-products.component';

@Component({
    selector: 'app-home-page',
    imports: [
        BestSellingProductsComponent,
        CategoryBoxComponent,
        PopularIntroductionComponent,
        SliderComponent,
        BestSellingProductsComponent,
    ],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.css'
})
export class HomePageComponent {}
