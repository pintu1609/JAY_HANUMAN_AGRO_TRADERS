import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/service/axiosinstance";
import ENDPOINTS from "@/service/endpoints";
import { z } from "zod";
import { WareHouseDataSchema } from "@/validation/warehouse";


const fetchWareHouseGoods = async ({year }: {year:number}) => {
  const {data } = await axiosInstance({
    method: "get",
    url: `${ENDPOINTS.WAREHOUSEGOODDETAILS}?year=${year}`,
    headers: { "Content-Type": "application/json" },
  });
  const statusSchema = z.number().optional();
  const messageSchema = z.string().optional();
  const status = statusSchema.parse(data.status);
  const message = messageSchema.parse(data.message);
  
  console.log("🚀 ~ fetchAllCompanyDetails ~ data:", data?.data?.[0]?.data)


    
    // const userData = z.array(dataSchema);
    // const sellerData = SellerGoodsItemSchema.parse(data.data.data);
    // const paymentData= PaymentItemSchema.parse(data.data.payment);
    // const retData={
    //     data:sellerData,
    //     payment:paymentData,
    //     totalCount:data.data.totalCount,
    // }
    const retData = WareHouseDataSchema.parse(data?.data?.[0].data);
    console.log("🚀 ~ fetchSellerGoodsByBrokerId ~ retData:", retData)

    return { status, message, data: retData, totalCount:data.data?.[0].totalCount.count};
  };


const useGetWareHouseGoods = (year:number) => {
  return useQuery({
    queryKey: ["useGetWareHouseGoods",year],
    queryFn: () => fetchWareHouseGoods({year:year}),
  });
};




export {useGetWareHouseGoods}