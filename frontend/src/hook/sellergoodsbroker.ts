import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/service/axiosinstance";
import ENDPOINTS from "@/service/endpoints";
// import { LoginParams,RegisterParams, UpdateRegisterUser } from "@/types/register/loginparam";
import { z, ZodError } from "zod";
import { SellerGoodsResponseSchema } from "@/validation/broker";


const fetchSellerGoodsByBrokerId = async ({id,year }: {id:string,year:number}) => {
  const {data } = await axiosInstance({
    method: "get",
    url: `${ENDPOINTS.SELLERGOODSDETAILSBYBROKERID}${id}/?year=${year}`,
    headers: { "Content-Type": "application/json" },
  });
  const statusSchema = z.number().optional();
  const messageSchema = z.string().optional();
  const status = statusSchema.parse(data.status);
  const message = messageSchema.parse(data.message);
  
  console.log("🚀 ~ fetchAllCompanyDetails ~ data:", data.data)


    
    // const userData = z.array(dataSchema);
    // const sellerData = SellerGoodsItemSchema.parse(data.data.data);
    // const paymentData= PaymentItemSchema.parse(data.data.payment);
    // const retData={
    //     data:sellerData,
    //     payment:paymentData,
    //     totalCount:data.data.totalCount,
    // }


  const retData = SellerGoodsResponseSchema.parse(data.data);

    // const retData = SellerGoodsResponseSchema.parse(data.data);
    console.log("🚀 ~ fetchSellerGoodsByBrokerId ~ retData:", retData)

    return { status, message, data: retData};
  };


const useGetSellerGoodsByBrokerId = (id:string,year:number) => {
  return useQuery({
    queryKey: ["useGetSellerGoodsByBrokerId",id,year],
    queryFn: () => fetchSellerGoodsByBrokerId({id:id,year:year}),
  });
};




export {useGetSellerGoodsByBrokerId}