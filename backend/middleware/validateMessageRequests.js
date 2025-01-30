import { messageSenderRequestSchema } from "../models/messageRequestsSchema.js";

export const messageSendRequestMiddleware = (req, res, next) => {
  const { error } = messageSenderRequestSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
