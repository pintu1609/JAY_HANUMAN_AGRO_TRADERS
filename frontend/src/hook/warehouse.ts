import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/service/axiosinstance";
import ENDPOINTS from "@/service/endpoints";
import { z } from "zod";
import { WareHouseDataSchema } from "@/validation/warehouse";

const fetchWareHouseGoods = async ({ year }: { year: number }) => {
  const { data } = await axiosInstance({
    method: "get",
    url: `${ENDPOINTS.WAREHOUSEGOODDETAILS}?year=${year}`,
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

const useGetWareHouseGoods = (year: number) => {
  return useQuery({
    queryKey: ["useGetWareHouseGoods", year],
    queryFn: () => fetchWareHouseGoods({ year: year }),
  });
};

export { useGetWareHouseGoods };
