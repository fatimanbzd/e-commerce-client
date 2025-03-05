export enum qlandSrviceTypeEnum {
  Product = 1,
  Travel = 2,
  Education = 3,
}

export const qlandSrviceType: { [key in qlandSrviceTypeEnum]: string } = {
  [qlandSrviceTypeEnum.Product]: 'کیوکالا',
  [qlandSrviceTypeEnum.Travel]: 'کیوآموز',
  [qlandSrviceTypeEnum.Education]: 'کیوسفر',
};
