import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/service/axiosinstance";
import ENDPOINTS from "@/service/endpoints";
// import { LoginParams,RegisterParams, UpdateRegisterUser } from "@/types/register/loginparam";
import { z } from "zod";
import { CompanyParams, UpdateCompanyParams } from "@/types/companydetails/companyparam";

const fetchAllCompanyDetails = async () => {
  const {data } = await axiosInstance({
    method: "get",
    url: ENDPOINTS.GET_ALL_COMPANY,
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
      companyName: z.string(),
      email: z.string().optional(),
      phone: z.array(z.string()),
      address: z.string(),
      gst: z.string().optional(),
      pan: z.string().optional(),
      createdAt: z.string(),
      updatedAt: z.string(),
    });
    
    const userData = z.array(dataSchema);
    const retData = userData.parse(data.data);
    return { status, message, data: retData };
  };

const useGetAllCompanyDetails = () => {
  return useQuery({
    queryKey: ["useGetAllCompanyDetails"],
    queryFn: () => fetchAllCompanyDetails(),
  });
};


const deletCompanyDetails = async (id: string) => {
  const { data } = await axiosInstance({
    method: "delete",
      url: `${ENDPOINTS.COMPANY}${id}`,
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

const useDeleteCompanyDetails = (onSuccess?: () => void) => {
  return useMutation({
    mutationKey: ["useDeleteCompanyDetails"],
    mutationFn: (id: string) => deletCompanyDetails(id),
    onSuccess: (data) => {
      onSuccess?.();
    },
  });
};

// create company

const fetchCreateCompany = async (params: CompanyParams) => {
  if (!params.email){
    delete params.email
  }
  if (!params.gst){
    delete params.gst
  }
  if (!params.pan){
    delete params.pan
  }

  const { data } = await axiosInstance({
    method: "post",
    url: ENDPOINTS.COMPANY,
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

const useCreateCompany = () => {
  return useMutation({
    mutationKey: ["useCreateClient"],
    mutationFn: (params: CompanyParams) => fetchCreateCompany(params),
  });
};

// update Client

const fetchUpdateCompany = async ({payload,id}: UpdateCompanyParams) => {

  if (!payload.email){
    delete payload.email
  }

  if (!payload.gst){
    delete payload.gst
  }
  if (!payload.pan){
    delete payload.pan
  }

  const { data } = await axiosInstance({
    method: "put",
    url: `${ENDPOINTS.COMPANY}${id}`,
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

const useUpdateCompany = () => {
  return useMutation({
    mutationKey: ["useUpdateClient"],
    mutationFn: ({payload,id}: UpdateCompanyParams) => fetchUpdateCompany({payload,id}),
  });
};


export {useGetAllCompanyDetails,useDeleteCompanyDetails, useCreateCompany, useUpdateCompany}