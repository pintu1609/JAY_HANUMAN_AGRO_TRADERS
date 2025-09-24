 export interface CompanyDetailsType {
    _id: string;
    name: string;
    companyName: string;
    email?: string;
    phone: string[];
    address: string; // include role
    gst?:string;
    pan?:string;
    userId: string;
    createdAt: string;
    updatedAt: string;

  }

  export interface CompanyParams {
  name: string;
  companyName: string;
  email?: string;
  phone: string[];
  address: string;
  gst?:string;
  pan?:string;
}

export interface UpdateCompanyParams {
  id: string;
  payload: CompanyParams;
}