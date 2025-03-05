import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsRelatedBarComponent } from './products-related-bar.component';

describe('ProductsRelatedBarComponent', () => {
  let component: ProductsRelatedBarComponent;
  let fixture: ComponentFixture<ProductsRelatedBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsRelatedBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsRelatedBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
