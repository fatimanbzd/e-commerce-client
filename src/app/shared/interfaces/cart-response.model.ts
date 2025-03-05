export interface ICartResponseModel {
  hasData: boolean;
  cartNumber: string;
  cartItems: ICartItemResponseModel[];
  totalPrice: number | null;
}

export interface ICartItemResponseModel {
  productPriceId: number;
  productId: number;
  count: number;
  lastAmount: number;
  colorId: number;
  colorData: string;
  colorName: string;
  vendorDisplayName: string;
  productGuaranty: number;
  price: number;
  imageSrc: string;
  productPersianTitle: string;
  highestNumberOfOrders: number;
  lowestNumberOfOrders: number;
  discountAmount: number;
}
