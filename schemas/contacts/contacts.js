const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).trim().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .trim()
    .required(),
  phone: Joi.string()
    .pattern(/^[0-9--]+$/, "numbers")
    .trim()
    .required(),
});

module.exports = {
  addSchema,
};
