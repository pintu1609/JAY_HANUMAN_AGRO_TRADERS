export interface Account {
  accountHolderName: string;
  accountNumber: string;
  ifscCode?: string;
}

export interface Payment {
    brokerId: string;
  amount: number;
  date: string;
  paymentType: string;
  chequeNumber?: string;
  fromAccount?: Account;
  toAccount?: Account;
}

export interface UpdatePayment {
  id: string;
  payload: Payment
}