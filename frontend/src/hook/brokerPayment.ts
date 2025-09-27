import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/service/axiosinstance";
import ENDPOINTS from "@/service/endpoints";
import { z } from "zod";
import { Payment, UpdatePayment } from "@/types/brokerdetails/brokerpayment";


// delete broker payment
const deletBrokerPayment = async (id: string) => {
  const { data } = await axiosInstance({
    method: "delete",
      url: `${ENDPOINTS.BROKERPAYMENT}${id}`,
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

const useDeleteBrokerPayment = (onSuccess?: () => void) => {
  return useMutation({
    mutationKey: ["useDeleteBrokerPayment"],
    mutationFn: (id: string) => deletBrokerPayment(id),
    onSuccess: (data) => {
      onSuccess?.();
    },
  });
};


//. CREATE BROKER PAYMENT

const fetchCreateBrokerPaymnet = async (params: Payment) => {
  if (!params.chequeNumber){
    delete params.chequeNumber
  }

  if (
    params.fromAccount &&
    !params.fromAccount.accountHolderName.trim() &&
    !params.fromAccount.accountNumber.trim() &&
    !params.fromAccount.ifscCode?.trim()
  ) {
    delete params.fromAccount;
  }
if (params.fromAccount?.ifscCode?.trim() === "") {
    delete params.fromAccount.ifscCode;
  }

  // Remove toAccount if all fields are empty
  if (
    params.toAccount &&
    !params.toAccount.accountHolderName.trim() &&
    !params.toAccount.accountNumber.trim() &&
    !params.toAccount.ifscCode?.trim()
  ) {
    delete params.toAccount;
  }

  if (params.toAccount?.ifscCode?.trim() === "") {
    delete params.toAccount.ifscCode;
  }

  const { data } = await axiosInstance({
    method: "post",
    url: ENDPOINTS.BROKERPAYMENT,
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

const useCreateBrokerPayment = () => {
  return useMutation({
    mutationKey: ["useCreateBrokerPayment"],
    mutationFn: (params: Payment) => fetchCreateBrokerPaymnet(params),
  });
};

// update broker

const fetchUpdateBrokerPayment = async ({payload,id}: UpdatePayment) => {

  if (!payload.chequeNumber){
    delete payload.chequeNumber
  }

  if (
    payload.fromAccount &&
    !payload.fromAccount.accountHolderName.trim() &&
    !payload.fromAccount.accountNumber.trim() &&
    !payload.fromAccount.ifscCode?.trim()
  ) {
    delete payload.fromAccount;
  }
if (payload.fromAccount?.ifscCode?.trim() === "") {
    delete payload.fromAccount.ifscCode;
  }

  // Remove toAccount if all fields are empty
  if (
    payload.toAccount &&
    !payload.toAccount.accountHolderName.trim() &&
    !payload.toAccount.accountNumber.trim() &&
    !payload.toAccount.ifscCode?.trim()
  ) {
    delete payload.toAccount;
  }

  if (payload.toAccount?.ifscCode?.trim() === "") {
    delete payload.toAccount.ifscCode;
  }

  const { data } = await axiosInstance({
    method: "put",
    url: `${ENDPOINTS.BROKERPAYMENT}${id}`,
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

const useUpdateBrokerPayment = () => {
  return useMutation({
    mutationKey: ["useUpdateBrokerPayment"],
    mutationFn: ({payload,id}: UpdatePayment) => fetchUpdateBrokerPayment({payload,id}),
  });
};


export {useDeleteBrokerPayment,useCreateBrokerPayment, useUpdateBrokerPayment}