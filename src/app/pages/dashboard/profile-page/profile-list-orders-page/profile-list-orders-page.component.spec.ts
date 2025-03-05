import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileListOrdersPageComponent } from './profile-list-orders-page.component';

describe('ProfileListOrdersPageComponent', () => {
  let component: ProfileListOrdersPageComponent;
  let fixture: ComponentFixture<ProfileListOrdersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileListOrdersPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileListOrdersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
