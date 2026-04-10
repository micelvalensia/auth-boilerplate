import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export const validate = (schema: Schema, property = "body") => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        message: detail.message,
        field: detail.path.join("."),
      }));

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    req[property] = value;

    next();
  };
};
