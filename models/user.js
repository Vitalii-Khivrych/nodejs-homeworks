const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const { handleSaveErrors } = require("../helpers");

const passwordRegexp = /^[a-zA-Z0-9]{3,30}$/;
const typeSubscription = ["starter", "pro", "business"];

const nameSchema = Joi.string().alphanum().min(3).max(30).trim();
const emailSchema = Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
  .trim();
const passwordSchema = Joi.string().pattern(passwordRegexp).trim();

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: typeSubscription,
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveErrors);

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const signupSchema = Joi.object({
  name: nameSchema.required(),
  email: emailSchema.required(),
  password: passwordSchema.required(),
});

const loginSchema = Joi.object({
  email: emailSchema.required(),
  password: passwordSchema.required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...typeSubscription)
    .required(),
});

const User = model("user", userSchema);

const schema = { signupSchema, loginSchema, subscriptionSchema };

module.exports = { User, schema };
