import { Component, DestroyRef, OnInit } from '@angular/core';
import { ITicketListModel } from '../../interfaces/ticket-list.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TicketService } from '../../services/ticket.service';
import { PersianDateTimePipe } from '@core/pipes/persian-date-time.pipe';
import { EnumLabelPipe } from '@core/pipes/enum-label.pipe';
import { PriorityTicketLabel } from '../../enums/priority-ticket.enum';
import { TicketStatusLabel } from '../../enums/status-ticket.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-list',
  imports: [PersianDateTimePipe, EnumLabelPipe],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.scss',
})
export class TicketListComponent implements OnInit {
  ticketLis: ITicketListModel[] = [];

  protected readonly PriorityTicketLabel = PriorityTicketLabel;
  protected readonly ticketStatusLabel = TicketStatusLabel;

  constructor(
    private ticketService: TicketService,
    private destroyRef: DestroyRef,
    private router: Router,
  ) {
    this.ticketService.ticketUpdated$
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.getList());
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.ticketService
      .tickets()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((ticket) => (this.ticketLis = ticket.items));
  }

  goToTicketDetails(data: ITicketListModel) {
    this.router.navigateByUrl(`/pages/dashboard/${data.ticketId}`);
  }
}
