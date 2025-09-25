import { z } from "zod";

const PackageItemSchema = z.object({
  _id: z.string(),
  package: z.string(),
  broker:z.object({
      _id: z.string(),
      name:z.string(),
  }),
  weight: z.number(),
  rate: z.number(),
  date: z.string(),
  amount: z.number(),
  commision: z.number(),
  wareHouse:z.boolean(),
});



 const PaymentItemSchema = z.object({
  _id: z.string(),
  amount: z.number(),
  sellerId: z.string(),
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

const ItemSchema = z.object({
  _id: z.string(),
  name: z.string().optional(),
  commisionAmount: z.number(),
  address: z.string().optional(),
  packages: z.array(PackageItemSchema),
  payments: z.array(PaymentItemSchema),
  totalAmount: z.number(),
  weightCost: z.number(),

});


 const SellerGoodsItemSchema= z.array(ItemSchema);

 const sellerGoodSchemsDetailsParams = z.array(
  z.object({
  _id: z.string(),
  name: z.string().optional(),
  commisionAmount: z.number(),
  address: z.string().optional(),
  packages: z.array(PackageItemSchema),
  totalAmount: z.number(),
  weightCost: z.number(),
 }))

export {
  PackageItemSchema,
  PaymentItemSchema,
  SellerGoodsItemSchema,
  sellerGoodSchemsDetailsParams
}