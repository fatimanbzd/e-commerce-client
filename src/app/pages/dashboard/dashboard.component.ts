import {Component} from '@angular/core';
import {
  ProfileBaseInformationComponent
} from '../../features/account/profile/components/profile-base-information/profile-base-information.component';
import {RouterOutlet} from '@angular/router';
import {ProfileMenuComponent} from '../../features/account/profile/components/profile-menu/profile-menu.component';

@Component({
    selector: 'app-dashboard',
  imports: [
    ProfileBaseInformationComponent,
    RouterOutlet,
    ProfileMenuComponent,
  ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {}
