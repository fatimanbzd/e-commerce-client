export enum TicketStatusEnum {
  New = 0,
  NewQuestion = 1,
  Reply = 2,
  Closed = 3,
}

export const TicketStatusLabel: { [key in TicketStatusEnum]: string } = {
  [TicketStatusEnum.New]: 'جدید',
  [TicketStatusEnum.NewQuestion]: 'پرسش جدید',
  [TicketStatusEnum.Reply]: 'پاسخ داده شده',
  [TicketStatusEnum.Closed]: 'بسته',
};
