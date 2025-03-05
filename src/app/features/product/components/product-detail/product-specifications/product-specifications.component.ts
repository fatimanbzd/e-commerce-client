import { Component, Input } from '@angular/core';
import { NgForOf } from '@angular/common';
import { productSpecifications } from '../../../interfaces/productSpecifications.model';

@Component({
    selector: 'app-product-specifications',
    imports: [NgForOf],
    templateUrl: './product-specifications.component.html',
    styleUrl: './product-specifications.component.scss'
})
export class ProductSpecificationsComponent {
  @Input() productSpecifications: productSpecifications[] | undefined = [];
}
