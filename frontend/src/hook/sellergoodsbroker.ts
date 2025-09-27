import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/service/axiosinstance";
import ENDPOINTS from "@/service/endpoints";
import { z, ZodError } from "zod";
import { SellerGoodsResponseSchema } from "@/validation/broker";

const fetchSellerGoodsByBrokerId = async ({
  id,
  year,
}: {
  id: string;
  year: number;
}) => {
  const { data } = await axiosInstance({
    method: "get",
    url: `${ENDPOINTS.SELLERGOODSDETAILSBYBROKERID}${id}/?year=${year}`,
    headers: { "Content-Type": "application/json" },
  });
  const statusSchema = z.number().optional();
  const messageSchema = z.string().optional();
  const status = statusSchema.parse(data.status);
  const message = messageSchema.parse(data.message);
  const retData = SellerGoodsResponseSchema.parse(data.data);
  return { status, message, data: retData };
};

const useGetSellerGoodsByBrokerId = (id: string, year: number) => {
  return useQuery({
    queryKey: ["useGetSellerGoodsByBrokerId", id, year],
    queryFn: () => fetchSellerGoodsByBrokerId({ id: id, year: year }),
  });
};

export { useGetSellerGoodsByBrokerId };
