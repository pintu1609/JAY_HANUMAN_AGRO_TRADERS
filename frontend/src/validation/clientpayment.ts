import z from "zod";

const ClientGoodsPayment = z.object({
    _id: z.string(),
    userId: z.string(),
    amount: z.number(),
    date: z.string(),
    paymentType: z.string(),
    chequeNumber: z.string().optional(),
    accountNumber: z.string().optional(),  
    
})


const ClientGoodsPaymentSchema = z.array(ClientGoodsPayment);

export {
    ClientGoodsPaymentSchema
}