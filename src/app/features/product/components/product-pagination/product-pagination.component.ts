import { Component, Input, OnInit } from '@angular/core';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'app-product-pagination',
    imports: [NgbPagination, RouterLink, NgClass],
    templateUrl: './product-pagination.component.html',
    styleUrl: './product-pagination.component.scss'
})
export class ProductPaginationComponent implements OnInit {
  currentPage = 1;
  @Input() itemsPerPage!: number;
  @Input() totalItems!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (!isNaN(params['pageNumber']))
        this.currentPage = +params['pageNumber'];
      else this.currentPage = 1;
    });
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  updateFilters(newFilters: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: newFilters,
      queryParamsHandling: 'merge',
    });
  }

  changePage(event: Event, pageNumber: number) {
    event.preventDefault();
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.updateFilters({ pageNumber: pageNumber });
      this.productService.filterProduct(true);
    }
  }
}
