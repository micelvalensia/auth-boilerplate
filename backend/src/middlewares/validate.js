export const validate = (schema, property = "body") => {
  return (req, res, next) => {
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

    // overwrite request with cleaned value
    req[property] = value;

    next();
  };
};
