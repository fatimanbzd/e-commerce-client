import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserInformationComponent } from './profile-user-information.component';

describe('ProfileUserInformationComponent', () => {
  let component: ProfileUserInformationComponent;
  let fixture: ComponentFixture<ProfileUserInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileUserInformationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileUserInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
