import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'core-confirmation-dialog',
    imports: [],
    templateUrl: './confirmation-dialog.component.html',
    styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {
  @Input() title: string = '';
  @Input() body: string = '';
  @Input() btnValue: string = '';

  constructor(public activeModal: NgbActiveModal) {}
}
