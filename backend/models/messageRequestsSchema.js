import Joi from "joi";

export const messageSenderRequestSchema = Joi.object({
    receiverId:Joi.string().required(),
    content:Joi.string().required(),
    type:Joi.string().required().optional(),
    attachments:Joi.string().optional(),
    replyTo:Joi.string().optional() 
})