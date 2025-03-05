import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ProfileUpdateComponent } from '../../features/account/profile/components/profile-update/profile-update.component';
import { ProfileBaseInformationComponent } from '../../features/account/profile/components/profile-base-information/profile-base-information.component';
import { ProfileUserInformationComponent } from '../../features/account/profile/components/profile-user-information/profile-user-information.component';
import { RouterOutlet } from '@angular/router';
import { ProfileMenuComponent } from '../../features/account/profile/components/profile-menu/profile-menu.component';

@Component({
    selector: 'app-dashboard',
    imports: [
        NgOptimizedImage,
        ProfileUpdateComponent,
        ProfileBaseInformationComponent,
        ProfileUserInformationComponent,
        RouterOutlet,
        ProfileMenuComponent,
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {}
