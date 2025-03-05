import { Component } from '@angular/core';
import { ProfileUpdateComponent } from '../../../features/account/profile/components/profile-update/profile-update.component';

@Component({
    selector: 'app-update-profile-page',
    imports: [ProfileUpdateComponent],
    templateUrl: './update-profile-page.component.html',
    styleUrl: './update-profile-page.component.scss'
})
export class UpdateProfilePageComponent {}
