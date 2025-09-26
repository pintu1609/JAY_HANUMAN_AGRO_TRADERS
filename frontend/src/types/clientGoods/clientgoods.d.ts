
interface Package {
    package: string;
    weight: number;
    rate: number;
    calculation: string;
}
interface SellerPackageParam {
    packageId: string;
    package: string;
}

interface SellerDetailsParam {
    sellerId?: string;
    sellerPackages: SellerPackageParam[];
    
}

interface CreateClientGood {
    clientId: string;
    companyId: string;
    vehicleNumber: string;
    packages: Package[];
    sellersDetails: SellerDetailsParam[];
    misleniousCharge: number;
    misleniousChargeDescription?: string;
    date: string;
    billNumber: string;
}


// update client parma

interface UpdateClientGood{
    payload:CreateClientGood;
    id:string
}
   
// for client goods response
interface PackageGoods {
    _id: string;
    package: string;
    weight: number;
    rate: number;
    calculation: string;
}

interface SellerPackageGoodsParam {
    _id: string;
    packageId: string;
    package: string;
}
interface SellerDetailsGoodsParam {
    _id: string;
    sellerId?: string;
    sellerPackages: SellerPackageGoodsParam[];
    
}

interface ClientGoodsItemParams {
    _id: string;
    userId: string;
    client: {
        _id: string;
        name: string;
        email?: string | null;
        phone: string[];
        address: string;
        companyName?: string | null;
    };
    company: {
        _id: string;
        name: string;
        companyName: string;
        email?: string | null;
        phone: string[];
        address: string;
        gst?: string | null;
        pan?: string | null;
    };
    vehicleNumber: string;
    packages: PackageGoods[];
    sellersDetails: SellerDetailsGoodsParam[];
    misleniousCharge: number;
    misleniousChargeDescription?: string | null;
    clientAmount: number;
    date: string;
    billNumber: string;
}
export { CreateClientGood, ClientGoodsItemParams, UpdateClientGood };