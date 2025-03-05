import { Component } from '@angular/core';
import { ProfileBaseInformationComponent } from '../../../features/account/profile/components/profile-base-information/profile-base-information.component';
import { ProfileUserInformationComponent } from '../../../features/account/profile/components/profile-user-information/profile-user-information.component';
import { ProfileListOrdersComponent } from '../../../features/account/profile/components/profile-list-orders/profile-list-orders.component';

@Component({
    selector: 'app-profile-page',
    imports: [
        ProfileBaseInformationComponent,
        ProfileUserInformationComponent,
        ProfileListOrdersComponent,
    ],
    templateUrl: './profile-page.component.html',
    styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {}
