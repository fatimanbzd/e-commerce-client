import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularIntroductionComponent } from './popular-introduction.component';

describe('PopularIntroductionComponent', () => {
  let component: PopularIntroductionComponent;
  let fixture: ComponentFixture<PopularIntroductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularIntroductionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PopularIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
