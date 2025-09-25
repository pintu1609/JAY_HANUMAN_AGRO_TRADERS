import { email, nullable, z } from "zod";

const packageSchema=z.object({
    _id: z.string(),
    package: z.string(),
    weight: z.number(),
    rate: z.number(),
    calculation: z.string(),
})


const sellerSchema=z.object({
    _id: z.string(),
    sellerId: z.string(),
    sellerPackages:z.array(
        z.object({
            _id: z.string(),
            packageId: z.string(),
            package: z.string(),
        })
    )
    })


const ClientGoodsItemSchema=z.array(
    z.object({
        _id: z.string(),
        userId: z.string(),
        client: z.object({
            _id: z.string(),
            name: z.string(),
            email: z.string().optional().nullable(),
            phone:z.array(z.string()),
            address: z.string(),
            companyName: z.string().optional().nullable(),
        }),
        company:z.object({
            _id: z.string(),
            name: z.string(),
            companyName: z.string(),
            email: z.string().optional().nullable(),
            phone:z.array(z.string()),
            address: z.string(),
            gst: z.string().optional().nullable(),
            pan: z.string().optional().nullable(),
        }),
        vehicleNumber: z.string(),
        packages:z.array(packageSchema),
        sellersDetails:z.array(sellerSchema),
        misleniousCharge: z.number(),
        misleniousChargeDescription: z.string().optional().nullable(),
        date: z.string(),
        clientAmount: z.number(),
        billNumber: z.string(),
        
    })
)
    

export {
    ClientGoodsItemSchema
}