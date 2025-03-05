export interface IMenuModel {
  label: string;
  icon: string;
  route?: string;
  children?: ISubMenuModel[];
}

interface ISubMenuModel {
  label: string;
  route: string;
  children?: ISubMenuModel[];
}
