import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderInformationDialogComponent } from './order-information-dialog.component';

describe('OrderInformationDialogComponent', () => {
  let component: OrderInformationDialogComponent;
  let fixture: ComponentFixture<OrderInformationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderInformationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderInformationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
