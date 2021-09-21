import Joi from "joi";
export const update = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(6)
        .max(10),
    name: Joi.string()
        .min(10)
        .max(20)
})
export const changePass = Joi.object({
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    repeat_password: Joi.ref('password')
})
export const forgot = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'vn'] } })
        .min(5)
        .max(25),
})