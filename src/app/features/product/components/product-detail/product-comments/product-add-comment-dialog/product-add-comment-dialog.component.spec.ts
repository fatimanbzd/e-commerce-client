import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddCommentDialogComponent } from './product-add-comment-dialog.component';

describe('ProductAddCommentDialogComponent', () => {
  let component: ProductAddCommentDialogComponent;
  let fixture: ComponentFixture<ProductAddCommentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAddCommentDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAddCommentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
