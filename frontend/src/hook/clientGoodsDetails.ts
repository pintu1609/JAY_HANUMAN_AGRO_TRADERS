import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/service/axiosinstance";
import ENDPOINTS from "@/service/endpoints";
import { z } from "zod";
import {
  CreateClientGood,
  UpdateClientGood,
} from "@/types/clientGoods/clientgoods";
import { ClientGoodsItemSchema } from "@/validation/client";

// create client details

const fetchCreateClientGoods = async (params: CreateClientGood) => {
  if (!params.misleniousChargeDescription) {
    delete params.misleniousChargeDescription;
  }

  const { data } = await axiosInstance({
    method: "post",
    url: ENDPOINTS.CLIENTGOODS,
    data: params,
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

const useCreateClientGood = () => {
  return useMutation({
    mutationKey: ["useCreateClientGood"],
    mutationFn: (params: CreateClientGood) => fetchCreateClientGoods(params),
  });
};

// fetch all client goods details

const fetchClientGoodsDetails = async (clientId?: string, year?: number) => {
  let url = `${ENDPOINTS.CLIENTGOODS}getAllClientBuyerGood`;
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
  const { data } = await axiosInstance({
    method: "get",
    url: url,
    headers: { "Content-Type": "application/json" },
  });
  const statusSchema = z.number().optional();
  const messageSchema = z.string().optional();
  const status = statusSchema.parse(data.status);
  const message = messageSchema.parse(data.message);
  const retData = ClientGoodsItemSchema.parse(data.data?.[0].data);
  return { status, message, data: retData, totalCount: data.data?.[0].totalCount, grandTotalClientAmount:data.data?.[0].grandTotalClientAmount, grandTotalPayment:data.data?.[0].grandTotalPayment };
};

const useGetClientGoodsDetails = ({
  clientId,
  year,
}: {
  clientId?: string;
  year?: number;
}) => {
  return useQuery({
    queryKey: ["useGetClientGoodsDetails", clientId, year],
    queryFn: () => fetchClientGoodsDetails(clientId, year),
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
    onSuccess: () => {
      onSuccess?.();
    },
  });
};

// update client details
const fetchUpdateClientGoods = async (params: UpdateClientGood) => {

  if (!params.payload.misleniousChargeDescription) {
    delete params.payload.misleniousChargeDescription;
  }

  const { data } = await axiosInstance({
    method: "put",
    url: `${ENDPOINTS.CLIENTGOODS}${params.id}`, //ENDPOINTS.CLIENTGOODS,
    data: params.payload,
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

const useUpdateClientGood = () => {
  return useMutation({
    mutationKey: ["useUpdateClientGood"],
    mutationFn: (params: UpdateClientGood) => fetchUpdateClientGoods(params),
  });
};

export {
  useCreateClientGood,
  useGetClientGoodsDetails,
  useDeleteClientGood,
  useUpdateClientGood,
};
