import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationUpdateDialogComponent } from './location-update-dialog.component';

describe('LocationUpdateDialogComponent', () => {
  let component: LocationUpdateDialogComponent;
  let fixture: ComponentFixture<LocationUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationUpdateDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LocationUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
