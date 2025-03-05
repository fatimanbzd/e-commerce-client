import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileListOrdersComponent } from './profile-list-orders.component';

describe('ProfileListOrdersComponent', () => {
  let component: ProfileListOrdersComponent;
  let fixture: ComponentFixture<ProfileListOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileListOrdersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileListOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
