import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSortFilterComponent } from './product-sort-filter.component';

describe('ProductSortFilterComponent', () => {
  let component: ProductSortFilterComponent;
  let fixture: ComponentFixture<ProductSortFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSortFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductSortFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
