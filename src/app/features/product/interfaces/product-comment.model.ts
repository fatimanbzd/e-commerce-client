export interface IProductCommentResponseModel {
  customerName: string;
  isBuyer: boolean;
  rating: number;
  title: string;
  advantages: string[];
  disadvantages: string[];
  body: string;
  createDate: string;
}

export interface IProductCommentAddModel {
  rating: number;
  title: string;
  advantages: string[];
  disadvantages: string[];
  body: string;
  registerAsAnonymous: boolean;
}
