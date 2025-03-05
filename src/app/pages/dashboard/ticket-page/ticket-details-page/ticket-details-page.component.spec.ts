import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketDetailsPageComponent } from './ticket-details-page.component';

describe('TicketDetailsPageComponent', () => {
  let component: TicketDetailsPageComponent;
  let fixture: ComponentFixture<TicketDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketDetailsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
