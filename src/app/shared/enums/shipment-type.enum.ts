export enum ShipmentTypeEnum {
  ImmediateDelivery,
  NormalDelivery,
}

export const ShipmentTypeLabel: { [key in ShipmentTypeEnum]: string } = {
  [ShipmentTypeEnum.ImmediateDelivery]: 'ارسال فوری',
  [ShipmentTypeEnum.NormalDelivery]: 'ارسال عادی',
};
