import { Component, DestroyRef, Input, OnInit } from '@angular/core';
import { NgbModal, NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductCommentService } from '../../../services/product-comment.service';
import { ProductAddCommentDialogComponent } from './product-add-comment-dialog/product-add-comment-dialog.component';
import { IListModel } from '../../../../../shared/interfaces/list.model';
import { IProductCommentResponseModel } from '../../../interfaces/product-comment.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../../auth/services/auth.service';
import { ProductCommentPaginationComponent } from './product-comment-pagination/product-comment-pagination.component';
import {PersianDatePipe} from '../../../../../shared/pipes/persian-date.pipe';

@Component({
  selector: 'app-product-comments',
  imports: [
    PersianDatePipe,
    NgbRating,
    ReactiveFormsModule,
    ProductCommentPaginationComponent,
  ],
  templateUrl: './product-comments.component.html',
  styleUrl: './product-comments.component.scss',
})
export class ProductCommentsComponent implements OnInit {
  comments: IListModel<IProductCommentResponseModel> | null = null;
  pageNumber = 1;
  pageSize = 3;
  @Input() productId!: number;

  constructor(
    private productCommentService: ProductCommentService,
    private destroyRef: DestroyRef,
    private router: Router,
    private modal: NgbModal,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.getComments(this.productId, this.pageNumber, this.pageSize);
  }

  getComments(productId: number, pageNumber: number, pageSize: number) {
    this.productCommentService
      .comments(productId, pageNumber, pageSize)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((comments) => (this.comments = comments));
  }

  addComment() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/login');
      return;
    }

    const modal = this.modal.open(ProductAddCommentDialogComponent, {
      size: 'lg',
    });
    modal.componentInstance.pi = this.productId;
    modal.componentInstance.productName =
      this.activatedRoute.snapshot.params['title'];
  }
}
