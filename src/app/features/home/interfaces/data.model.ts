export interface ICategoryMenuModel {
  menuItems: IMenuItemModel[];
  groupStatistics: IGroupStatisticModel[];
}

export interface IMenuItemModel {
  id: number;
  name: string;
  parentId: number;
  parentName: string;
  description: string;
}

export interface IGroupStatisticModel {
  type: number;
  totalCount: number;
}
