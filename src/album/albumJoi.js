import Joi from "joi";
export const create = Joi.object({
    name: Joi.string()
        .min(5)
        .max(20)
        .required(),
    description: Joi.string()
        .min(10)
        .max(50)
})
export const update = Joi.object({
    name: Joi.string()
        .min(5)
        .max(20)
        .required(),
    description: Joi.string()
        .min(10)
        .max(100),
    updatedAt: Joi.date()
})