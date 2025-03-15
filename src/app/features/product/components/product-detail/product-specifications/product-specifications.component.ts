import {Component, Input} from '@angular/core';
import {productSpecifications} from '../../../interfaces/productSpecifications.model';

@Component({
    selector: 'app-product-specifications',
    templateUrl: './product-specifications.component.html',
    styleUrl: './product-specifications.component.scss'
})
export class ProductSpecificationsComponent {
  @Input() productSpecifications: productSpecifications[] | undefined = [];
}
