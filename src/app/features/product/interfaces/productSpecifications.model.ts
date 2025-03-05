export interface IProductSpecificationsModel {
  productPersianTitle: string;
  productEnglishTitle: string;
  productDescription: string;
  productShortDescription: string;
  brandPersianTitle: string;
  productSpecifications: productSpecifications[];
  prices: prices[];
  images: images[];
}

export interface productSpecifications {
  groupName: string;
  specifications: specifications[];
}

export interface specifications {
  key: string;
  value: string;
  isSpecial: boolean;
}

export interface prices {
  productPriceId: number;
  productPriceColorId: number;
  productPriceColorName: string;
  productPriceColorData: string;
  productPriceProductGuaranty: number;
  productPricePrice: number;
  productPriceValueAddedTax: number;
  discountAmount: number;
  productPriceHighestNumberOfOrders: number;
  productPriceLowestNumberOfOrders: number;
  productPriceVendorId: number;
  productPriceVendorName: string;
  isExist: boolean;
}

export interface images {
  imageAttachmentId: number;
  title: string;
  imageSrc: string;
  isMainImage: boolean;
}

export interface IPriceViewModel {
  productPriceId: number;
  productPriceColorId: number;
  productPriceColorName: string;
  productPriceColorData: string;
  productPriceProductGuaranty: number;
  productPriceDiscount: number;
  discountAmount: number;
  productPricePrice: number;
  productPriceValueAddedTax: number;
  productPriceHighestNumberOfOrders: number;
  productPriceLowestNumberOfOrders: number;
  productPriceVendorId: number;
  productPriceVendorName: string;
  isExist: boolean;
  lastAmount: number;
  taxAmount: number;
  count: number;
}
