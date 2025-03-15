export enum InvoiceTransactionStateEnum {
  Pending = 0,
  Expired = 1,
  Complete = 2,
}

export const InvoiceTransactionStateLabel: {
  [key in InvoiceTransactionStateEnum]: string;
} = {
  [InvoiceTransactionStateEnum.Pending]: 'موقت',
  [InvoiceTransactionStateEnum.Expired]: 'منقضی شده',
  [InvoiceTransactionStateEnum.Complete]: 'تکمیل نهایی',
};
