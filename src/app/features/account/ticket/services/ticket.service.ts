import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ITicketListModel } from '../interfaces/ticket-list.model';
import { IListModel } from '@core/interfaces/list.model';
import { ITicketDetailsModel } from '../interfaces/ticket-details.model';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private _ticketUpdatedSubject = new Subject<void>();
  ticketUpdated$ = this._ticketUpdatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  add(formData: FormData): Observable<void> {
    return this.http.post<void>('api/Tickets', formData);
  }

  tickets(): Observable<IListModel<ITicketListModel>> {
    return this.http.get<IListModel<ITicketListModel>>('api/Tickets');
  }

  ticketDetails(ticketId: number): Observable<ITicketDetailsModel> {
    return this.http.get<any>(`api/Tickets/${ticketId}`);
  }

  reply(ticketId: number, formData: FormData): Observable<void> {
    return this.http.post<void>(`api/Tickets/${ticketId}/Comments`, formData);
  }

  download(fileId: number): Observable<void> {
    return this.http.get<void>(`api/Images/${fileId}/File`);
  }

  setTicketUpdated() {
    this._ticketUpdatedSubject.next();
  }
}
