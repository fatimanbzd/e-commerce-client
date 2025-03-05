import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../features/layout/components/navbar/navbar.component';
import { HeaderComponent } from '../features/layout/components/header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from '../features/layout/components/footer/footer.component';

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    imports: [
        RouterOutlet,
        NavbarComponent,
        HeaderComponent,
        DashboardComponent,
        FooterComponent,
    ],
    styleUrls: ['./pages.component.scss']
})
export class PagesComponent {
  @Input() isCollapsed = false;
}
