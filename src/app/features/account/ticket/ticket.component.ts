import { Component } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {
  TicketRegistrationDialogComponent
} from "./components/ticket-registration-dialog/ticket-registration-dialog.component";
import {TicketListComponent} from "./components/ticket-list/ticket-list.component";

@Component({
  selector: 'app-ticket',
  imports: [
    TicketListComponent
  ],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss'
})
export class TicketComponent {

  constructor(private modalService: NgbModal) {}

  openAddModel() {
    const modalRef = this.modalService.open(TicketRegistrationDialogComponent);
    modalRef.componentInstance.ticket = null;
  }

}
