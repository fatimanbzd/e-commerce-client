import { Component } from '@angular/core';
import { PrivacyComponent } from '../../../../features/footer-items/components/privacy/privacy.component';

@Component({
    selector: 'app-privacy-page',
    imports: [PrivacyComponent],
    templateUrl: './privacy-page.component.html',
    styleUrl: './privacy-page.component.scss'
})
export class PrivacyPageComponent {}
