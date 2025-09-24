 export interface BrokerDetailsType {
    _id: string;
    userId: string;
    name: string;
    email: string;
    phone: string;
    paymentCalculation: string;
    paymentValue: number;
    createdAt: string;
    updatedAt: string;

  }


// seller detail by broker id param

export interface PackageItem {
  package: string;
  weight: number;
  rate: number;
  date: string;
  brokerCommission: number;
  amount: number;
  commision: number;
}

export interface SellerGoodsItem {
  _id: string;
  sellerName?: string | null;
  sellerAddress?: string | null;
  totalBrokerCommission: number;
  packages: PackageItem[];
}

export interface PaymentItem {
  _id: string;
  amount: number;
  brokerId: string;
  date: string;
  paymentType:string;
  chequeNumber?: string;
  fromAccount?: {
    accountHolderName: string;
    accountNumber: string;
    ifscCode?: string;
  };
  toAccount?: {
    accountHolderName: string;
    accountNumber: string;
    ifscCode?: string;
  };
}



export interface PaymentItemdetais {
  _id: string;
  name?: string;
  address?: string;
  amount: number;
  brokerId: string;
  date: string;
  paymentType:string;
  chequeNumber?: string;
  fromAccount?: {
    accountHolderName: string;
    accountNumber: string;
    ifscCode?: string;
  };
  toAccount?: {
    accountHolderName: string;
    accountNumber: string;
    ifscCode?: string;
  };
}
export interface SellerGoodsParams {
 
    data?: SellerGoodsItem[];
    payment?: PaymentItem[];
    totalCount: number;
  
}


export interface BrokerParams {
  name: string;
  email?: string;
  phone: string;
  paymentCalculation: string;
  paymentValue: number;
}

export interface UpdateBrokerType {
  id: string
        name: string
        email?: string
        phone: string
        paymentCalculation: string
        paymentValue: number
  
}

export interface UpdateBrokerParams {
  id: string;
  payload: BrokerParams;
}
