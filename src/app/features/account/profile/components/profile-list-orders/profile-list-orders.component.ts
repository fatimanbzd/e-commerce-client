import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IProfileListOrdersModel } from '../../interfaces/profile-list-orders.model';
import { finalize, Subject, takeUntil } from 'rxjs';
import { ProfileService } from '../../services/profile.service';
import { NgForOf, NgStyle } from '@angular/common';
import { Router } from '@angular/router';
import {PersianDatePipe} from '../../../../../shared/pipes/persian-date.pipe';
import {EnumLabelPipe} from '../../../../../shared/pipes/enum-label.pipe';
import {InvoiceStatusLabel} from '../../../../../shared/enums/invoice-status.enum';

@Component({
  selector: 'app-profile-list-orders',
  imports: [PersianDatePipe, NgForOf, NgStyle, EnumLabelPipe],
  templateUrl: './profile-list-orders.component.html',
  styleUrl: './profile-list-orders.component.scss',
})
export class ProfileListOrdersComponent implements OnDestroy, OnInit {
  @Input() profilePage!: boolean;
  @Input() maxItems: number = 10;
  totalCount: number = 0;

  protected readonly InvoiceStatusLabel = InvoiceStatusLabel;

  listOfOrder!: IProfileListOrdersModel[];
  loading = true;
  pageNumber = 1;
  pageSize = 10;
  totalPages: number = 0;
  private readonly _destroy = new Subject<void>();

  constructor(
    private profileService: ProfileService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.loading = true;
    this.profileService
      .listOrders(this.pageNumber, this.pageSize)
      .pipe(
        takeUntil(this._destroy),
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe((data) => {
        this.listOfOrder = data.items.slice(0, this.maxItems);
        this.totalPages = Math.ceil(data.totalCount / this.pageSize);
        this.totalCount = data.totalCount;
      });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageNumber = page;
      this.getOrders();
    }
  }

  getPaginationPages(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  goToOrderDetails(data: IProfileListOrdersModel) {
    this.router.navigateByUrl(
      `/pages/dashboard/${data.id}/${data.invoiceNumber}`,
    );
  }

  goToOrderList() {
    this.router.navigateByUrl('/pages/dashboard/order-detail');
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
