import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/service/axiosinstance";
import ENDPOINTS from "@/service/endpoints";
import { z } from "zod";
import { CreateClientGood } from "@/types/clientGoods/clientgoods";
import { ClientGoodsItemSchema } from "@/validation/client";



// fetch all client details

const fetchCreateClientGoods = async (params: CreateClientGood) => {
  console.log("🚀 ~ fetchCreateBrokerPaymnet ~ params:", params)
  // if (!params.misleniousCharge){
  //   delete params.misleniousCharge
  // }
  if (!params.misleniousChargeDescription){
    delete params.misleniousChargeDescription
  }

  

  const { data } = await axiosInstance({
    method: "post",
    url: ENDPOINTS.CLIENTGOODS,
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

  

  return { status, message};
};

const useCreateClientGood = () => {
  return useMutation({
    mutationKey: ["useCreateClientGood"],
    mutationFn: (params: CreateClientGood) => fetchCreateClientGoods(params),
  });
};


// create client goods details

const fetchClientGoodsDetails = async (year?:number) => {
  const {data } = await axiosInstance({
    method: "get",
    url: `${ENDPOINTS.CLIENTGOODS}getAllClientBuyerGood?year=${year}`,
    headers: { "Content-Type": "application/json" },
  });
  const statusSchema = z.number().optional();
  const messageSchema = z.string().optional();
  const status = statusSchema.parse(data.status);
  const message = messageSchema.parse(data.message);
  
  console.log("🚀 ~ fetchAllCompanyDetails ~ data:", data)

    const retData = ClientGoodsItemSchema.parse(data.data?.[0].data);
    console.log("🚀 ~ fetchSellerGoodsByBrokerId ~ retData:", retData)

    return { status, message, data: retData};
  };



const useGetClientGoodsDetails = (year?:number) => {
  return useQuery({
    queryKey: ["useGetClientGoodsDetails",year ],
    queryFn: () => fetchClientGoodsDetails(year),
  });
};


// delete client goods details

const deletClientGood = async (id: string) => {
  const { data } = await axiosInstance({
    method: "delete",
      url: `${ENDPOINTS.CLIENTGOODS}${id}`,
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

const useDeleteClientGood = (onSuccess?: () => void) => {
  return useMutation({
    mutationKey: ["useDeleteClientGood"],
    mutationFn: (id: string) => deletClientGood(id),
    onSuccess: (data) => {
      onSuccess?.();
    },
  });
};

export {
    useCreateClientGood,
    useGetClientGoodsDetails,
    useDeleteClientGood
}