import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCommentPaginationComponent } from './product-comment-pagination.component';

describe('ProductCommentPaginationComponent', () => {
  let component: ProductCommentPaginationComponent;
  let fixture: ComponentFixture<ProductCommentPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCommentPaginationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCommentPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
