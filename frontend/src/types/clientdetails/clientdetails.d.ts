 export interface ClientDetailsType {
    _id: string;
    userId: string;
    name: string;
    email?: string;
    phone: string[];
    address: string;
    companyName?: {
      _id: string;
      name: string;
      companyName: string;
      email?: string;
      phone: string[];
      address: string;
      gst?: string;
      pan?: string;
    };
    createdAt: string;
    updatedAt: string;

  }


export interface ClientParams {
  name: string;
  email?: string;
  phone: string[];
  address: string;
  companyName: string;
}

export interface UpdateClientParams {
  id: string;
  payload: ClientParams;
}