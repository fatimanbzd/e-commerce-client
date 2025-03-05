export interface IProfileOrderDetailsModel {
  invoiceId: number;
  invoiceState: number;
  invoiceTotalAmount: number;
  invoiceDescription: string;
  recipientFullName: string;
  recipientMobileNumber: string;
  recipientPhoneNumber: string;
  recipientAddress: string;
  recipientPostalCode: string;
  invoiceNumber: string;
  invoiceRegisterDate: string;
  customerFullName: string;
  customerMobileNumber: string;
  customerNationalNumber: string;
  discountAmount: number;
  items: items[];
  transactions: transactions[];
  taxAmount: number;
  shippingCostAmount: number;
}

export interface items {
  invoiceItemId: number;
  count: number;
  price: number;
  productId: number;
  productTitle: string;
  imageSrc: string;
  productVendorId: number;
  productVendorTitle: string;
  productDiscountAmount: number;
  productPriceColorId: number;
  productPriceColorData: string;
  productPriceColorName: string;
  productGuaranty: number;
  sendStatus: number;
  deliveryCode: string;
  productCode: number;
  lastAmount: number;
  "deliveryType": number,
  "deliveryDate": string,
  "deliveryTime": string,
  "shipmentNumber":string

}

export interface transactions {
  totalAmount: number;
  createDate: string;
  state: number;
  description: string;
}
