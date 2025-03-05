export interface IAllLocationResponseModel {
  id: number;
  title: string;
  provinceTitle: string;
  cityTitle: string;
  address: string;
  postalCode: string;
  isDefault: boolean;
}

export interface ILocationResponseModel {
  id: number;
  title: string;
  provinceCode: number;
  provinceTitle: string;
  cityCode: number;
  cityTitle: string;
  address: string;
  plaque: number;
  postalCode: string;
  isDefault: boolean;
}
