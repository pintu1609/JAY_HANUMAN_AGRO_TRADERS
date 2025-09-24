interface packageItem {
  _id: string;
  package: string;
  weight: number;
  rate: number;
  date: string;
  amount: number;
  commision: number;
  wareHouse: boolean;
}

 export interface WareHouseDetailsParams {
  _id: string;
  sellerName?: string ;
  sellerAddress?: string;
  packages: PackageItem[];
}

export interface WareHouseResponseParams {
  data: WareHouseDetails[];
  totalCount: {
    count: number;
  }[];
}
