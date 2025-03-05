import { Component } from '@angular/core';
import { LocationComponent } from '../../../features/account/location/location.component';

@Component({
    selector: 'app-location-page',
    imports: [LocationComponent],
    templateUrl: './location-page.component.html',
    styleUrl: './location-page.component.scss'
})
export class LocationPageComponent {}
