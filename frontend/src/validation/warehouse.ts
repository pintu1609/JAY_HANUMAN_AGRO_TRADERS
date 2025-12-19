import { z } from "zod";


const PackageSchema = z.object({
    _id:z.string(),
  package: z.string(),
  weight: z.number(),
  rate: z.number(),
  amount: z.number(),
  commision: z.number(),
  date: z.string(),
  wareHouse: z.boolean(),
remaining: z.number(),
});

// ✅ Schema for a single seller's goods
const SellerGoodsSchema = z.object({
  _id: z.string(),
  sellerName: z.string().optional(),
  sellerAddress: z.string().optional(),
  packages: z.array(PackageSchema),
})

const WareHouseDataSchema = z.array(SellerGoodsSchema)
  

export {
    WareHouseDataSchema
}