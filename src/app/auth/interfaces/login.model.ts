export interface ICustomerRequestLoginModel {
  mobileNumber: string;
}

export interface ICustomerLoginModel {
  mobileNumber: string;
  verificationCode: string;
}

export interface ICustomerLoginResponseModel {
  waitTime: number;
}

export interface IMobileVerificationModel {
  mobileNumber: string;
  waitingTime: number;
}
