import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileOrderDetailsComponent } from './profile-order-details.component';

describe('ProfileOrderDetailsComponent', () => {
  let component: ProfileOrderDetailsComponent;
  let fixture: ComponentFixture<ProfileOrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileOrderDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
