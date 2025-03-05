import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAddToCartDialogComponent } from './confirm-add-to-cart-dialog.component';

describe('ConfirmAddToCartDialogComponent', () => {
  let component: ConfirmAddToCartDialogComponent;
  let fixture: ComponentFixture<ConfirmAddToCartDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmAddToCartDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmAddToCartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
