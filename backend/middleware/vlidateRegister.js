import { userUpdateSchema, userValidationRegisterSchema } from "../models/validationSchema.js";

const validateUserRegister = (req, res, next) => {
    const { error } = userValidationRegisterSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}

const validateUserUpdate = (req, res, next) => {
    const { error } = userUpdateSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}

export{validateUserRegister, validateUserUpdate}