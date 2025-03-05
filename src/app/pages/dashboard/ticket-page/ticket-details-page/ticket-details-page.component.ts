import { Component } from '@angular/core';
import {
  TicketDetailsComponent
} from "../../../../features/account/ticket/components/ticket-details/ticket-details.component";

@Component({
  selector: 'app-ticket-details-page',
  imports: [
    TicketDetailsComponent
  ],
  templateUrl: './ticket-details-page.component.html',
  styleUrl: './ticket-details-page.component.scss'
})
export class TicketDetailsPageComponent {

}
