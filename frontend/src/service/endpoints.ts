const  ENDPOINTS = {
    LOGIN: '/api/v1/register/login/',
    REGISTER: '/api/v1/register/',
    GET_ALL_USER: '/api/v1/register/getAllUser',
    GET_USER_BY_ID: '/api/v1/register/getUserById',
    USER: '/api/v1/register/',
    

    // company details

    GET_ALL_COMPANY: '/api/v1/companydetails/getCompany',
  COMPANY: '/api/v1/companydetails/',

    // broker details
    GET_ALL_BROKER : '/api/v1/broker/getAllBroker',
    DELETEBROKER : '/api/v1/broker/',
    BROKERDETAILS : '/api/v1/broker/getBrokerById',
    BROKER:'/api/v1/broker/',

    // seller GOODS details BY BROKER ID
    SELLERGOODSDETAILSBYBROKERID : '/api/v1/seller/getSellerDetailsByBrokerId/',

    //seller good details
    GET_ALL_SELLER_GOOD_WITH_PAYMENT : '/api/v1/seller/getAllSellerGoodWithPayment/',
    GET_ALL_SELLER_GOOD : '/api/v1/seller/getAllSellerGood/',
    SELLER : '/api/v1/seller/',
    
    //seller payment details
    SELLERPAYMENT:'/api/v1/sellerPayment/',


    // cllient details
    GET_ALL_CLIENT : '/api/v1/clientdetails/getClient',
    CLIENT : '/api/v1/clientdetails/',

    // client goods details

    CLIENTGOODS:'/api/v1/clientGood/',

    // broker Payments
    BROKERPAYMENT:'/api/v1/brokerPayment/',

    // warehouse goods details
    WAREHOUSEGOODDETAILS:'/api/v1/wareHouseDetails/wareHouseDetails'
    
}
export default ENDPOINTS