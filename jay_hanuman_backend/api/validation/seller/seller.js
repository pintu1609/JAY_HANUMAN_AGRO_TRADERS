const joi = require("joi");

const sellerSchema = joi.object({
        name: joi.string(),
        address: joi.string(),
        packages: joi.array().items(
            joi.object({
                package: joi.string().required(),
                weight: joi.number().required(),
                rate: joi.number().required(),
                date: joi.date().required(),
                broker: joi.string().required(),
                commision: joi.number().required(),
                wareHouse:joi.boolean().required()
            })
        ).required(),
    }).or('name','address');
    
module.exports={
        sellerSchema
}