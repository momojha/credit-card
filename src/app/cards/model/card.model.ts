export interface Card {
  id:string,
  cardNumber: string;
  cardHolder: string;
  expirationDate: Date;
  securityCode:string;
  amount:number;
}
