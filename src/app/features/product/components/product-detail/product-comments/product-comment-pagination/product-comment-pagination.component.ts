import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-comment-pagination',
  imports: [],
  templateUrl: './product-comment-pagination.component.html',
  styleUrl: './product-comment-pagination.component.scss',
})
export class ProductCommentPaginationComponent {
  currentPage = 1;
  @Input() itemsPerPage!: number;
  @Input() totalItems!: number;
  @Output() pageChanged = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  changePage(event: Event, pageNumber: number) {
    event.preventDefault();
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.pageChanged.emit(pageNumber);
      this.currentPage = pageNumber;
    }
  }
}
