import { Component } from '@angular/core';
import { ProductsBarComponent } from './products-bar/products-bar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-best-selling-products',
  imports: [ProductsBarComponent, RouterLink],
  templateUrl: './best-selling-products.component.html',
  standalone: true,
  styleUrl: './best-selling-products.component.scss',
})
export class BestSellingProductsComponent {}
