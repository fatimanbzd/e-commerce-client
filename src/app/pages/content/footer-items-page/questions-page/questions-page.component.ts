import { Component } from '@angular/core';
import { QuestionsComponent } from '../../../../features/footer-items/components/questions/questions.component';

@Component({
    selector: 'app-questions-page',
    imports: [QuestionsComponent],
    templateUrl: './questions-page.component.html',
    styleUrl: './questions-page.component.scss'
})
export class QuestionsPageComponent {}
