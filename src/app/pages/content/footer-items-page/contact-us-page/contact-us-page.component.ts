import { Component } from '@angular/core';
import { ContactUsComponent } from '../../../../features/footer-items/components/contact-us/contact-us.component';

@Component({
    selector: 'app-contact-us-page',
    imports: [ContactUsComponent],
    templateUrl: './contact-us-page.component.html',
    styleUrl: './contact-us-page.component.scss'
})
export class ContactUsPageComponent {}
