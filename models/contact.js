const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveErrors } = require("../helpers");

const phoneRegexp = /^\d{3} \d{3}-\d{4}$/;
const nameSchema = Joi.string().alphanum().min(3).max(30).trim();
const emailSchema = Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
  .trim();
const phoneSchema = Joi.string().pattern(phoneRegexp).trim();

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      match: phoneRegexp,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveErrors);

const addSchema = Joi.object({
  name: nameSchema.required(),
  email: emailSchema.required(),
  phone: phoneSchema.required(),
  favorite: Joi.boolean(),
});

const updateContactSchema = Joi.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  favorite: Joi.boolean(),
}).min(1);

const updateStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateStatusSchema,
  updateContactSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
