export interface IProductItemModel {
  id: number;
  title: string;
  price: number;
  productColors: productColors[];
  imageSrc: string;
  isExist: boolean;
  discounted: boolean;
}

export interface productColors {
  id: number;
  name: string;
  data: string;
}
