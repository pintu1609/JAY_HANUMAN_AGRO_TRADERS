import { z } from "zod";

 const PackageItemSchema = z.object({
  package: z.string(),
  weight: z.number(),
  rate: z.number(),
  date: z.string(),
  brokerCommission: z.number(),
  amount: z.number(),
  commision: z.number(),
});



 const PaymentItemSchema = z.object({
  _id: z.string(),
  amount: z.number(),
  brokerId: z.string(),
  date: z.string(),
  paymentType: z.string(),
  chequeNumber: z.string().optional(),
  fromAccount: z
    .object({
      accountHolderName: z.string(),
      accountNumber: z.string(),
      ifscCode: z.string().optional(),
    })
    .optional(),
  toAccount: z
    .object({
      accountHolderName: z.string(),
      accountNumber: z.string(),
      ifscCode: z.string().optional(),

    })
    .optional(),
});



 const SellerGoodsItemSchema = z.object({
  _id: z.string(),
  sellerName: z.string().optional().nullable(),
  sellerAddress: z.string().optional().nullable(),
  totalBrokerCommission: z.number(),
  packages: z.array(PackageItemSchema),

});



const SellerGoodsResponseSchema = z.object({
    data: z.array(SellerGoodsItemSchema),
    payment: z.array(PaymentItemSchema),
    totalCount: z.number(),
  })

export {SellerGoodsItemSchema,PaymentItemSchema,SellerGoodsResponseSchema}




