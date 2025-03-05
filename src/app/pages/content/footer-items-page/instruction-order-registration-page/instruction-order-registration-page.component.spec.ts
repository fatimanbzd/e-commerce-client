import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionOrderRegistrationPageComponent } from './instruction-order-registration-page.component';

describe('InstructionOrderRegistrationPageComponent', () => {
  let component: InstructionOrderRegistrationPageComponent;
  let fixture: ComponentFixture<InstructionOrderRegistrationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructionOrderRegistrationPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      InstructionOrderRegistrationPageComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
