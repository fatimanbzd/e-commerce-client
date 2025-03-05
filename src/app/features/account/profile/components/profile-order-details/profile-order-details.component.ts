import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProfileService } from '../../services/profile.service';
import { IProfileOrderDetailsModel } from '../../interfaces/profile-order-details.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PersianDatePipe } from '@core/pipes/persian-date.pipe';
import { PricePipe } from '@core/pipes/price.pipe';
import { FullSrcPipe } from '@core/pipes/full-src.pipe';
import { NgStyle } from '@angular/common';
import { EnumLabelPipe } from '@core/pipes/enum-label.pipe';
import { sendStatus } from '../../pipes/sendStatus.pipe';
import { ProductGuarantyLabel } from '../../../../../shared/enums/product-guaranty.enum';
import { PersianDateTimePipe } from '@core/pipes/persian-date-time.pipe';
import { InvoiceStatusLabel } from '@core/enums/invoice-status.enum';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderInformationDialogComponent } from '../order-information-dialog/order-information-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceTransactionStateLabel } from '@core/enums/invoice-transaction-state.enum';

@Component({
  selector: 'app-profile-order-details',
  imports: [
    PersianDatePipe,
    PricePipe,
    FullSrcPipe,
    NgStyle,
    EnumLabelPipe,
    sendStatus,
    RouterLink,
    PersianDateTimePipe,
    ReactiveFormsModule,
  ],
  templateUrl: './profile-order-details.component.html',
  styleUrl: './profile-order-details.component.scss',
})
export class ProfileOrderDetailsComponent implements OnInit, OnDestroy {
  data!: IProfileOrderDetailsModel;
  invoiceId: number | undefined;
  token!: string;
  protected readonly ProductGuarantyLabel = ProductGuarantyLabel;
  protected readonly InvoiceStatusLabel = InvoiceStatusLabel;

  protected readonly InvoiceTransactionStateLabel =
    InvoiceTransactionStateLabel;

  private readonly _destroy = new Subject<void>();

  constructor(
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
  ) {}

  ngOnInit() {
    this.invoiceId = this.activatedRoute.snapshot.params['id'];
    this.loadData();
  }

  loadData() {
    if (this.invoiceId) this.getProfileOrderDetails(this.invoiceId);
  }

  getProfileOrderDetails(invoiceId: number) {
    return this.profileService
      .profileOrderDetails(invoiceId)
      .pipe(takeUntil(this._destroy))
      .subscribe((data) => (this.data = data));
  }

  openOrder(invoiceItemId: number) {
    const modalRef = this.modalService.open(OrderInformationDialogComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.data = this.data.items.find(
      (item) => item.invoiceItemId === invoiceItemId,
    );
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
