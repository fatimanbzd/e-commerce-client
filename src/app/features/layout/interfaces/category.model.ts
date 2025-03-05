export interface ICategoryModel {
  menuItems: menuItems[];
  groupStatistics: groupStatistics[];
}

export interface menuItems {
  id: number;
  name: string;
  parentId: number;
  parentName: string;
  description: string;
}

export interface groupStatistics {
  type: number;
  totalCount: number;
}
