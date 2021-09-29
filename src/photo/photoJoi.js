import Joi from "joi";
export const photoUpdate = Joi.object({
    status: Joi.string(),
    name: Joi.string()
        .min(3)
        .max(20),
    updatedAt: Joi.date()
})
export const page = Joi.object({
    page: Joi.number()
})