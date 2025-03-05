import { IProductColorResponseModel } from './product-color-response.model';

export interface IProductResponseModel {
  id: number;
  title: string;
  price: number;
  isExist: boolean;
  discounted: boolean;
  productColors: IProductColorResponseModel[];
  imageSrc: string;
}
