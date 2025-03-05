import { Component } from '@angular/core';
import {TicketComponent} from "../../../features/account/ticket/ticket.component";

@Component({
  selector: 'app-ticket-page',
  imports: [
    TicketComponent
  ],
  templateUrl: './ticket-page.component.html',
  styleUrl: './ticket-page.component.scss'
})
export class TicketPageComponent {

}
