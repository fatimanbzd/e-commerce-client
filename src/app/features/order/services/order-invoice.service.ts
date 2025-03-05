import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPreInvoiceModel } from '../interfaces/pre-invoice.model';

@Injectable({
  providedIn: 'root',
})
export class OrderInvoiceService {
  constructor(private http: HttpClient) {}

  preInvoice(): Observable<IPreInvoiceModel> {
    return this.http.get<IPreInvoiceModel>('api/invoices/pre-invoice');
  }
}
