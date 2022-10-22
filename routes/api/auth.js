const express = require("express");

const router = express.Router();

const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers/auth");
const { auth, validateBody } = require("../../middlewares");
const { schema } = require("../../models/user");

router.post("/signup", validateBody(schema.signupSchema), ctrlWrapper(ctrl.signup));

router.post("/login", validateBody(schema.loginSchema), ctrlWrapper(ctrl.login));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
