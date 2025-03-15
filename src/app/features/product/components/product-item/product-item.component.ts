import {Component, Input, OnInit} from '@angular/core';
import {IProductItemModel} from "../../interfaces/product-item.model";
import {FullSrcPipe} from '../../../../shared/pipes/full-src.pipe';
import {PricePipe} from '../../../../shared/pipes/price.pipe';

@Component({
    selector: 'app-product-item',
    imports: [FullSrcPipe, PricePipe],
    templateUrl: './product-item.component.html',
    styleUrl: './product-item.component.scss'
})
export class ProductItemComponent implements OnInit{
  @Input() productItem!: IProductItemModel;
  uniqueColors: any[] = [];

  ngOnInit(): void {
    this.filterUniqueColors();
  }

  filterUniqueColors(): void {
    if (this.productItem && this.productItem.productColors) {
      this.uniqueColors = this.productItem.productColors.filter(
        (color, index, self) =>
          index === self.findIndex((c) => c.id === color.id)
      );
    }
  }
}
