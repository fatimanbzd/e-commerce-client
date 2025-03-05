import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileOrderDetailsPageComponent } from './profile-order-details-page.component';

describe('ProfileOrderDetailsPageComponent', () => {
  let component: ProfileOrderDetailsPageComponent;
  let fixture: ComponentFixture<ProfileOrderDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileOrderDetailsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileOrderDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
