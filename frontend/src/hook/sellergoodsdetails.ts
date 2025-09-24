import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/service/axiosinstance";
import ENDPOINTS from "@/service/endpoints";
import { z } from "zod";
import { SellerGoodsItemSchema } from "@/validation/seller";
import { CreateSellerGood, UpdateSellerGoods } from "@/types/sellerDetails/sellerparam";


const fetchSellerGoodsDetails = async ({year }: {year:number}) => {
  const {data } = await axiosInstance({
    method: "get",
    url: `${ENDPOINTS.GET_ALL_SELLER_GOOD}?year=${year}`,
    headers: { "Content-Type": "application/json" },
  });
  const statusSchema = z.number().optional();
  const messageSchema = z.string().optional();
  const status = statusSchema.parse(data.status);
  const message = messageSchema.parse(data.message);
  
  console.log("🚀 ~ fetchAllCompanyDetails ~ data:", data)

    const retData = SellerGoodsItemSchema.parse(data.data.data[0].data);
    console.log("🚀 ~ fetchSellerGoodsByBrokerId ~ retData:", retData)

    return { status, message, data: retData};
  };


const useGetSellerGoodsDetails = (year:number) => {
  return useQuery({
    queryKey: ["useGetSellerGoodsDetails",year ],
    queryFn: () => fetchSellerGoodsDetails({year:year}),
  });
};


// seller goods delete

const deletSellerGood = async (id: string) => {
  const { data } = await axiosInstance({
    method: "delete",
      url: `${ENDPOINTS.SELLER}${id}`,
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

const useDeleteSellerGood = (onSuccess?: () => void) => {
  return useMutation({
    mutationKey: ["useDeleteSellerGood"],
    mutationFn: (id: string) => deletSellerGood(id),
    onSuccess: (data) => {
      onSuccess?.();
    },
  });
};

// create seller good

const fetchCreateSellerGoods = async (params: CreateSellerGood) => {
  console.log("🚀 ~ fetchCreateBrokerPaymnet ~ params:", params)
  if (!params.name){
    delete params.name
  }
  if (!params.address){
    delete params.address
  }

  

  const { data } = await axiosInstance({
    method: "post",
    url: ENDPOINTS.SELLER,
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

const useCreateSellerGood = () => {
  return useMutation({
    mutationKey: ["useCreateSellerGood"],
    mutationFn: (params: CreateSellerGood) => fetchCreateSellerGoods(params),
  });
};

// update goods

const fetchUpdateSellerGoods = async ({payload,id}: UpdateSellerGoods) => {

  if (!payload.name){
    delete payload.name
  }

 if (!payload.address){
  delete payload.address
 }

  const { data } = await axiosInstance({
    method: "put",
    url: `${ENDPOINTS.SELLER}${id}`,
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

const useUpdateSellerGoods = () => {
  return useMutation({
    mutationKey: ["useUpdateSellerGoods"],
    mutationFn: ({payload,id}: UpdateSellerGoods) =>fetchUpdateSellerGoods({payload,id}),
  });
};




export {useGetSellerGoodsDetails, useDeleteSellerGood, useCreateSellerGood, useUpdateSellerGoods}