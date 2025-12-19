import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/service/axiosinstance";
import ENDPOINTS from "@/service/endpoints";
import { z } from "zod";
import { WareHouseDataSchema } from "@/validation/warehouse";

const fetchWareHouseGoods = async ({ year,tab }: { year: number,tab?:string }) => {
  const { data } = await axiosInstance({
    method: "get",
    url: `${ENDPOINTS.WAREHOUSEGOODDETAILS}?year=${year}&tab=${tab}`,
    headers: { "Content-Type": "application/json" },
  });
  const statusSchema = z.number().optional();
  const messageSchema = z.string().optional();
  const status = statusSchema.parse(data.status);
  const message = messageSchema.parse(data.message);
  const retData = WareHouseDataSchema.parse(data?.data?.[0].data);
  return {
    status,
    message,
    data: retData,
    totalCount: data.data?.[0].totalCount.count,
  };
};

const useGetWareHouseGoods = (year: number,tab?:string) => {
  return useQuery({
    queryKey: ["useGetWareHouseGoods", year,tab],
    queryFn: () => fetchWareHouseGoods({ year: year,tab:tab }),
  });
};

export { useGetWareHouseGoods };
