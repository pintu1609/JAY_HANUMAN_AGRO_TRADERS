import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/service/axiosinstance";
import ENDPOINTS from "@/service/endpoints";
import { z } from "zod";
import { BrokerParams, UpdateBrokerParams } from "@/types/brokerdetails/broker.param";

const fetchAllBrokerDetails = async () => {
  const {data } = await axiosInstance({
    method: "get",
    url: ENDPOINTS.GET_ALL_BROKER,
    headers: { "Content-Type": "application/json" },
  });
  const statusSchema = z.number().optional();
  const messageSchema = z.string().optional();
  const status = statusSchema.parse(data.status);
  const message = messageSchema.parse(data.message);
  
  const dataSchema = z.object({
     _id: z.string(),
      userId: z.string(),
      name: z.string(),
      email: z.string(),
      phone: z.string(),
      paymentCalculation: z.string(),
      paymentValue: z.number(),
      createdAt: z.string(),
      updatedAt: z.string(),
    });
    
    const userData = z.array(dataSchema);
    const retData = userData.parse(data.data);
    return { status, message, data: retData };
  };

const useGetAllBrokerDetails = () => {
  return useQuery({
    queryKey: ["useGetAllBrokerDetails"],
    queryFn: () => fetchAllBrokerDetails(),
  });
};

const fetchBrokerDetails = async (id:string) => {
  const {data } = await axiosInstance({
    method: "get",
    url: `${ENDPOINTS.BROKERDETAILS}/${id}`,
    headers: { "Content-Type": "application/json" },
  });
  const statusSchema = z.number().optional();
  const messageSchema = z.string().optional();
  const status = statusSchema.parse(data.status);
  const message = messageSchema.parse(data.message);
  
  const dataSchema = z.object({
     _id: z.string(),
      userId: z.string(),
      name: z.string(),
      email: z.string(),
      phone: z.string(),
      paymentCalculation: z.string(),
      paymentValue: z.number(),
      createdAt: z.string(),
      updatedAt: z.string(),
    });
    
    const retData = dataSchema.parse(data.data);
    return { status, message, data: retData };
  };

const useGetBrokerDetails = (id:string) => {
  return useQuery({
    queryKey: ["useGetBrokerDetails"],
    queryFn: () => fetchBrokerDetails(id),
  });
};


const deletBrokerDetails = async (id: string) => {
  const { data } = await axiosInstance({
    method: "delete",
      url: `${ENDPOINTS.DELETEBROKER}${id}`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const statusSchema = z.number().optional();
  const messageSchema = z.string().optional();
  const status = statusSchema.parse(data.status);
  const message = messageSchema.parse(data.message);




  return { status, message };
};

const useDeleteBrokerDetails = (onSuccess?: () => void) => {
  return useMutation({
    mutationKey: ["useDeleteBrokerDetails"],
    mutationFn: (id: string) => deletBrokerDetails(id),
    onSuccess: (data) => {
      onSuccess?.();
    },
  });
};


//. CREATE BROKER

const fetchCreateBroker = async (params: BrokerParams) => {
  if (!params.email){
    delete params.email
  }

  const { data } = await axiosInstance({
    method: "post",
    url: ENDPOINTS.BROKER,
    data: params,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const statusSchema = z.number().optional();
  const messageSchema = z.string().optional();

  const status = statusSchema.parse(data.status);
  const message = messageSchema.parse(data.message);
  return { status, message};
};

const useCreateBroker = () => {
  return useMutation({
    mutationKey: ["useCreateBroker"],
    mutationFn: (params: BrokerParams) => fetchCreateBroker(params),
  });
};

// update broker

const fetchUpdateBroker = async ({payload,id}: UpdateBrokerParams) => {

  if (!payload.email){
    delete payload.email
  }

  const { data } = await axiosInstance({
    method: "put",
    url: `${ENDPOINTS.BROKER}${id}`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const statusSchema = z.number().optional();
  const messageSchema = z.string().optional();
  const status = statusSchema.parse(data.status);
  const message = messageSchema.parse(data.message);
  return { status, message};
};

const useUpdateBroker = () => {
  return useMutation({
    mutationKey: ["useUpdateBroker"],
    mutationFn: ({payload,id}: UpdateBrokerParams) => fetchUpdateBroker({payload,id}),
  });
};
export {useGetAllBrokerDetails,useDeleteBrokerDetails,useGetBrokerDetails,useCreateBroker,useUpdateBroker}