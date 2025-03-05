import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSideBarFilterComponent } from './product-side-bar-filter.component';

describe('ProductSideBarFilterComponent', () => {
  let component: ProductSideBarFilterComponent;
  let fixture: ComponentFixture<ProductSideBarFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSideBarFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductSideBarFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
