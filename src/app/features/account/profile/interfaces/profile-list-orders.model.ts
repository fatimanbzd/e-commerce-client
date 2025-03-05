export interface IProfileListOrdersModel {
  id: number;
  customerFullName: string;
  invoiceNumber: string;
  invoiceState: number;
  invoiceRegisterDate: string;
  invoiceTotalAmount: number;
  paid: boolean;
  recipientFullName: string;
  isSelf: boolean;
}
