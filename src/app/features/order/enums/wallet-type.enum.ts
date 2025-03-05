export enum WalletTypeEnum {
  gift,
  commercial,
  default,
  intentional,
}

export const WalletTypeLabel: { [key in WalletTypeEnum]: string } = {
  [WalletTypeEnum.gift]: 'هدیه',
  [WalletTypeEnum.commercial]: 'تجاری',
  [WalletTypeEnum.default]: 'عادی',
  [WalletTypeEnum.intentional]: 'محدود یا  هدفمند',
};
