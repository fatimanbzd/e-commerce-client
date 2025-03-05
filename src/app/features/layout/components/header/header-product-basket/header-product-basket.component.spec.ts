import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderProductBasketComponent } from './header-product-basket.component';

describe('HeaderProductBasketComponent', () => {
  let component: HeaderProductBasketComponent;
  let fixture: ComponentFixture<HeaderProductBasketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderProductBasketComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderProductBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
