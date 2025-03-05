import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionOrderRegistrationComponent } from './instruction-order-registration.component';

describe('InstructionOrderRegistrationComponent', () => {
  let component: InstructionOrderRegistrationComponent;
  let fixture: ComponentFixture<InstructionOrderRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructionOrderRegistrationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InstructionOrderRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
