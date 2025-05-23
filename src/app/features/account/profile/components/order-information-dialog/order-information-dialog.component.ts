import {Component, Input} from '@angular/core';
import {NgbActiveModal, NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {items} from '../../interfaces/profile-order-details.model';
import {sendStatus} from '../../pipes/sendStatus.pipe';
import {EnumLabelPipe} from '../../../../../shared/pipes/enum-label.pipe';
import {PersianDatePipe} from '../../../../../shared/pipes/persian-date.pipe';
import {InvoiceItemStatusEnum} from '../../../../../shared/enums/invoice-item-status.enum';
import {
  IInvoiceItemDeliveryEnum,
  InvoiceItemDeliveryLabel
} from '../../../../../shared/enums/incoice-item-delivery.enum';

@Component({
  selector: 'app-order-information-dialog',
  imports: [NgbTooltip, sendStatus, EnumLabelPipe, PersianDatePipe],
  templateUrl: './order-information-dialog.component.html',
  styleUrl: './order-information-dialog.component.scss',
})
export class OrderInformationDialogComponent {
  @Input() data!: items;

  protected readonly InvoiceItemStatusEnum = InvoiceItemStatusEnum;
  protected readonly IInvoiceItemDeliveryEnum = IInvoiceItemDeliveryEnum;
  protected readonly invoiceItemDeliveryLabel = InvoiceItemDeliveryLabel;

  constructor(public activeModal: NgbActiveModal) {}
}
