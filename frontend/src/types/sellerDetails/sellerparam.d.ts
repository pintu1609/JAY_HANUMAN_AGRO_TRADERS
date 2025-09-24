export interface PackageItem {
  _id: string;
  package: string;
  weight: number;
  rate: number;
  date: string;
  broker:{
    _id: string;
    name: string;
  }
  amount: number;
  commision: number;
  wareHouse:boolean;
}
export interface PaymentItem {
  _id: string;
  amount: number;
  sellerId: string;
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
  _id: string;
  name?: string;
  address?: string;
   commisionAmount: number;
  packages: PackageItem[];
   payments: PaymentItem[],
    totalAmount: number,
    weightCost: number
}

export interface CreateSellerPayment {
  amount: number;
  sellerId: string;
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


export interface UpdateSellerPayment {
  payload:CreateSellerPayment,
  id:string

}



export interface PaymentItemdetais {
  _id: string;
  name?: string;
  address?: string;
  amount: number;
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


export interface CreatePackage {
  package: string;
  weight: number;
  rate: number;
  date: string;
  broker:string
  commision: number;
  wareHouse:boolean
}

export interface CreateSellerGood {
  name?: string;
  address?: string;
  packages: CreatePackage[];
}
export interface UpdateSellerGoods{
  payload:CreateSellerGood,
  id:string

}

export interface PackageDetailsItem {
  _id: string;
  package: string;
  weight: number;
  rate: number;
  date: string;
  broker: {
    _id: string;
    name: string;
  };
  amount: number;
  commision: number;
  wareHouse:boolean;
}
export interface SellerGoodsDetailsParams {
  _id: string;
  name?: string;
  address?: string;
  packages: PackageDetailsItem[];
 
    
}
interface updatePackageDetailsItem {
  _id: string;
  package: string;
  weight: number;
  rate: number;
  date: string;
  broker: string;
  amount: number;
  commision: number;
  wareHouse:boolean;
}

export interface updateSellerParams {
  _id: string;
  name?: string;
  address?: string;
  packages: updatePackageDetailsItem[];
}