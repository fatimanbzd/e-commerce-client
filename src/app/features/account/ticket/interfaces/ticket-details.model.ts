export interface ITicketDetailsModel {
  ticketId: number;
  title: string;
  priority: number;
  status: number;
  body: string;
  fileId: number;
  createDate: string;
  customerFullName: string;
  items: items[];
}

export interface items {
  ticketId: number;
  body: string;
  fileId: number;
  createDate: string;
  isSupport: boolean;
}
