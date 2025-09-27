import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/service/axiosinstance";
import ENDPOINTS from "@/service/endpoints";
import { z } from "zod";
import {
  CreateSellerPayment,
  UpdateSellerPayment,
} from "@/types/sellerDetails/sellerparam";

// delete seller payment
const deletSellerPayment = async (id: string) => {
  const { data } = await axiosInstance({
    method: "delete",
    url: `${ENDPOINTS.SELLERPAYMENT}${id}`,
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

const useDeleteSellerPayment = (onSuccess?: () => void) => {
  return useMutation({
    mutationKey: ["useDeleteSellerPayment"],
    mutationFn: (id: string) => deletSellerPayment(id),
    onSuccess: (data) => {
      onSuccess?.();
    },
  });
};

//. CREATE seller PAYMENT

const fetchCreateSellerPaymnet = async (params: CreateSellerPayment) => {
  if (!params.chequeNumber) {
    delete params.chequeNumber;
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
    url: ENDPOINTS.SELLERPAYMENT,
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

const useCreateSellerPayment = () => {
  return useMutation({
    mutationKey: ["useCreateSellerPayment"],
    mutationFn: (params: CreateSellerPayment) =>
      fetchCreateSellerPaymnet(params),
  });
};

// update seller payment

const fetchUpdateSellerPayment = async ({
  payload,
  id,
}: UpdateSellerPayment) => {
  if (!payload.chequeNumber) {
    delete payload.chequeNumber;
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
    url: `${ENDPOINTS.SELLERPAYMENT}${id}`,
    data: payload,
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

const useUpdateSellerPayment = () => {
  return useMutation({
    mutationKey: ["useUpdateSellerPayment"],
    mutationFn: ({ payload, id }: UpdateSellerPayment) =>
      fetchUpdateSellerPayment({ payload, id }),
  });
};

export {
  useDeleteSellerPayment,
  useCreateSellerPayment,
  useUpdateSellerPayment,
};
