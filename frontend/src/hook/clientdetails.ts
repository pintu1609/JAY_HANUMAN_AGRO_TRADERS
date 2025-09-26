import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/service/axiosinstance";
import ENDPOINTS from "@/service/endpoints";
// import { LoginParams,RegisterParams, UpdateRegisterUser } from "@/types/register/loginparam";
import { z } from "zod";
import { ClientParams, UpdateClientParams } from "@/types/clientdetails/clientdetails";

const fetchAllClientDetails = async () => {
  const {data } = await axiosInstance({
    method: "get",
    url: ENDPOINTS.GET_ALL_CLIENT,
    headers: { "Content-Type": "application/json" },
  });
  const statusSchema = z.number().optional();
  const messageSchema = z.string().optional();
  const status = statusSchema.parse(data.status);
  const message = messageSchema.parse(data.message);
  
  console.log("🚀 ~ client ~ data:", data)

  const dataSchema = z.object({
     _id: z.string(),
      userId: z.string(),
      name: z.string(),
      email: z.string().optional(),
      phone: z.array(z.string()),
      address: z.string(),
      companyName: z.object({
        _id: z.string(),
        name: z.string(),
        companyName: z.string(),
        email: z.string().optional(),
        phone: z.array(z.string()),
        address: z.string(),
        gst: z.string().optional(),
        pan: z.string().optional(),
      }).optional(),
      createdAt: z.string(),
      updatedAt: z.string(),
    });
    
    const userData = z.array(dataSchema);
    const retData = userData.parse(data.data);
    console.log("🚀 ~ client ~ retData:", retData)
    return { status, message, data: retData };
  };

const useGetAllClientDetails = () => {
  return useQuery({
    queryKey: ["useGetAllClientDetails"],
    queryFn: () => fetchAllClientDetails(),
  });
};

// get clint by id
const fetchAllClientDetailsById = async (id: string) => {
  const {data } = await axiosInstance({
    method: "get",
    url: `${ENDPOINTS.GET_CLIENT_BY_ID}/${id}`,
    headers: { "Content-Type": "application/json" },
  });
  const statusSchema = z.number().optional();
  const messageSchema = z.string().optional();
  const status = statusSchema.parse(data.status);
  const message = messageSchema.parse(data.message);
  
  console.log("🚀 ~ client ~ data:", data)

  const dataSchema = z.object({
     _id: z.string(),
      userId: z.string(),
      name: z.string(),
      email: z.string().optional(),
      phone: z.array(z.string()),
      address: z.string(),
      companyName: z.object({
        _id: z.string(),
        name: z.string(),
        companyName: z.string(),
        email: z.string().optional(),
        phone: z.array(z.string()),
        address: z.string(),
        gst: z.string().optional(),
        pan: z.string().optional(),
      }).optional().nullable(),
      createdAt: z.string(),
      updatedAt: z.string(),
    });
    
    // const userData = z.array(dataSchema);
    const retData = dataSchema.parse(data.data);
    console.log("🚀 ~ client ~ retData:", retData)
    return { status, message, data: retData };
  };

const useGetAllClientDetailsById = (id: string) => {
  return useQuery({
    queryKey: ["useGetAllClientDetailsById",id],
    queryFn: () => fetchAllClientDetailsById(id),
  });
};

const deletClientDetails = async (id: string) => {
  const { data } = await axiosInstance({
    method: "delete",
      url: `${ENDPOINTS.CLIENT}${id}`,
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

const useDeleteClientDetails = (onSuccess?: () => void) => {
  return useMutation({
    mutationKey: ["useDeleteClientDetails"],
    mutationFn: (id: string) => deletClientDetails(id),
    onSuccess: (data) => {
      onSuccess?.();
    },
  });
};


//. CREATE Client

const fetchCreateClient = async (params: ClientParams) => {
  if (!params.email){
    delete params.email
  }

  const { data } = await axiosInstance({
    method: "post",
    url: ENDPOINTS.CLIENT,
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

const useCreateClient = () => {
  return useMutation({
    mutationKey: ["useCreateClient"],
    mutationFn: (params: ClientParams) => fetchCreateClient(params),
  });
};

// update Client

const fetchUpdateClient = async ({payload,id}: UpdateClientParams) => {

  if (!payload.email){
    delete payload.email
  }

  const { data } = await axiosInstance({
    method: "put",
    url: `${ENDPOINTS.CLIENT}${id}`,
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

const useUpdateClient = () => {
  return useMutation({
    mutationKey: ["useUpdateClient"],
    mutationFn: ({payload,id}: UpdateClientParams) => fetchUpdateClient({payload,id}),
  });
};

export {useGetAllClientDetails,useDeleteClientDetails, useCreateClient, useUpdateClient, useGetAllClientDetailsById}