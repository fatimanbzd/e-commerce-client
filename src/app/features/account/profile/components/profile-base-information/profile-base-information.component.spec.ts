import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBaseInformationComponent } from './profile-base-information.component';

describe('ProfileBaseInformationComponent', () => {
  let component: ProfileBaseInformationComponent;
  let fixture: ComponentFixture<ProfileBaseInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileBaseInformationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileBaseInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
