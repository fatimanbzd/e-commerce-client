export interface IProductRelatedModel {
  id: number;
  title: string;
  price: number;
  isExist: boolean;
  discounted: boolean;
  productColors: productColors[];
  imageSrc: string;
}

export interface productColors {
  id: number;
  name: string;
  data: string;
}
