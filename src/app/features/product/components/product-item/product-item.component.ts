import {Component, Input, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FullSrcPipe} from "@core/pipes/full-src.pipe";
import {PricePipe} from "@core/pipes/price.pipe";
import {IProductItemModel} from "../../interfaces/product-item.model";

@Component({
    selector: 'app-product-item',
    imports: [NgForOf, FullSrcPipe, PricePipe],
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
