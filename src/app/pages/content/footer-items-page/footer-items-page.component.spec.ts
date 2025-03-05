import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterItemsPageComponent } from './footer-items-page.component';

describe('FooterItemsPageComponent', () => {
  let component: FooterItemsPageComponent;
  let fixture: ComponentFixture<FooterItemsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterItemsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterItemsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
