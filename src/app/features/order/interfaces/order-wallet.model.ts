export interface IOrderWalletResponseModel {
  address: string;
  title: string;
  walletType: number;
  isActive: boolean;
  balance: number;
  selected?: boolean;
}

export interface IOrderPaymentModel {
  walletAddress: string;
}
