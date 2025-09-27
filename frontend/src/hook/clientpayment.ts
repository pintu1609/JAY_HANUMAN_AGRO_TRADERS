import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/service/axiosinstance";
import ENDPOINTS from "@/service/endpoints";
import { z } from "zod";
import { CreateSellerPayment, UpdateSellerPayment } from "@/types/sellerDetails/sellerparam";
import { CreateClientPayment, UpdateClientPayment } from "@/types/clientGoods/cientpayment";
import { ClientGoodsPaymentSchema } from "@/validation/clientpayment";


// delete seller payment
const deletClientPayment = async (id: string) => {
  const { data } = await axiosInstance({
    method: "delete",
      url: `${ENDPOINTS.CLIENTGOODSPAYMENT}${id}`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("🚀 ~ fetchRegister ~ data:", data);

  const statusSchema = z.number().optional();
  const messageSchema = z.string().optional();

  const status = statusSchema.parse(data.status);
  const message = messageSchema.parse(data.message);




  return { status, message };
};

const useDeleteClientPayment = (onSuccess?: () => void) => {
  return useMutation({
    mutationKey: ["useDeleteClientPayment"],
    mutationFn: (id: string) => deletClientPayment(id),
    onSuccess: (data) => {
      onSuccess?.();
    },
  });
};


//. CREATE seller PAYMENT

const fetchCreateClientPaymnet = async (params: CreateClientPayment) => {
  console.log("🚀 ~ fetchCreateBrokerPaymnet ~ params:", params)
  if (!params.chequeNumber){
    delete params.chequeNumber
  }

  if (!params.accountNumber){
    delete params.accountNumber
  }
  


  // Remove toAccount if all fields are empty
  

  const { data } = await axiosInstance({
    method: "post",
    url: ENDPOINTS.CLIENTGOODSPAYMENT,
    data: params,
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("🚀 ~ fetchRegister ~ data:", data);

  const statusSchema = z.number().optional();
  const messageSchema = z.string().optional();

  const status = statusSchema.parse(data.status);
  const message = messageSchema.parse(data.message);

  // const dataSchema = z.object({
  //   // token: z.string(),
  //   // refreshToken: z.string(),
  //   name: z.string(),
  //   email: z.string(),
  //   // phone: z.string(),
  //   role: z.string(),
  // });

  // const retData = dataSchema.parse(data.data);

  return { status, message};
};

const useCreateClientPayment = () => {
  return useMutation({
    mutationKey: ["useCreateClientPayment"],
    mutationFn: (params: CreateClientPayment) => fetchCreateClientPaymnet(params),
  });
};

// update seller payment

const fetchUpdateClientPayment = async ({payload,id}: UpdateClientPayment) => {

  if (!payload.chequeNumber){
    delete payload.chequeNumber
  }

  if (!payload.accountNumber){
    delete payload.accountNumber
  }

  const { data } = await axiosInstance({
    method: "put",
    url: `${ENDPOINTS.CLIENTGOODSPAYMENT}${id}`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("🚀 ~ fetchRegister ~ data:", data);

  const statusSchema = z.number().optional();
  const messageSchema = z.string().optional();

  const status = statusSchema.parse(data.status);
  const message = messageSchema.parse(data.message);

  // const dataSchema = z.object({
  //   // token: z.string(),
  //   // refreshToken: z.string(),
  //   name: z.string(),
  //   email: z.string(),
  //   // phone: z.string(),
  //   role: z.string(),
  // });

  // const retData = dataSchema.parse(data.data);

  return { status, message};
};

const useUpdateClientPayment = () => {
  return useMutation({
    mutationKey: ["useUpdateClientPayment"],
    mutationFn: ({payload,id}: UpdateClientPayment) => fetchUpdateClientPayment({payload,id}),
  });
};



// FETCH client payment by client id
const fetchClientGoodsPaymentDetails = async (clientId?:string,year?:number) => {
  let url = `${ENDPOINTS.CLIENTGOODSPAYMENT}getAllClientGoodsPayment`;
  if (clientId) {
    url += `/${clientId}`;
  }
  const queryParams: string[] = [];
  if (year) {
    queryParams.push(`year=${year}`);
  }
  if (queryParams.length > 0) {
    url += `?${queryParams.join("&")}`;
  }
  const {data } = await axiosInstance({
    method: "get",
    url: url,
    headers: { "Content-Type": "application/json" },
  });
  const statusSchema = z.number().optional();
  const messageSchema = z.string().optional();
  const status = statusSchema.parse(data.status);
  const message = messageSchema.parse(data.message);
  
  console.log("🚀 ~ fetchAllCompanyDetails ~ data:", data)

    const retData = ClientGoodsPaymentSchema.parse(data.data?.[0].data);
    console.log("🚀 ~ fetchSellerGoodsByBrokerId ~ retData:", retData)

    return { status, message, data: retData};
  };



const useGetClientGoodsPaymentDetails = ({clientId,year}: {clientId?:string,year?:number}) => {
  return useQuery({
    queryKey: ["useGetClientGoodsPaymentDetails",clientId,year ],
    queryFn: () => fetchClientGoodsPaymentDetails(clientId,year),
  });
};

export {useDeleteClientPayment,useCreateClientPayment, useUpdateClientPayment, useGetClientGoodsPaymentDetails};