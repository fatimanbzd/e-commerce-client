export enum PriorityTicketEnum {
  High = 0,
  Middle = 1,
  Low = 2,
}

export const PriorityTicketLabel: { [key in PriorityTicketEnum]: string } = {
  [PriorityTicketEnum.High]: 'زیاد',
  [PriorityTicketEnum.Middle]: 'متوسط',
  [PriorityTicketEnum.Low]: 'کم',
};
