import {Component, Inject, Input, PLATFORM_ID} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from '../features/layout/components/header/header.component';
import {FooterComponent} from '../features/layout/components/footer/footer.component';
import {isPlatformBrowser} from '@angular/common';

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
  ],
    styleUrls: ['./pages.component.scss']
})
export class PagesComponent {
  @Input() isCollapsed = false;
  isBrowser: boolean;
  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
}
