import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCategoryMenuComponent } from './header-category-menu.component';

describe('HeaderCategoryMenuComponent', () => {
  let component: HeaderCategoryMenuComponent;
  let fixture: ComponentFixture<HeaderCategoryMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderCategoryMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderCategoryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
