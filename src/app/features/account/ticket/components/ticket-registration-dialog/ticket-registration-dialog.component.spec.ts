import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketRegistrationDialogComponent } from './ticket-registration-dialog.component';

describe('TicketRegistrationDialogComponent', () => {
  let component: TicketRegistrationDialogComponent;
  let fixture: ComponentFixture<TicketRegistrationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketRegistrationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketRegistrationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
