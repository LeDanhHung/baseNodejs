import Joi from "joi";
export const register = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(6)
        .max(20)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'vn'] } })
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    repeat_password: Joi.ref('password'),
    name: Joi.string()
        .min(10)
        .max(20)
        .required()
})
export const login = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(6)
        .max(20),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'vn'] } })
        .min(5)
        .max(100),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
})