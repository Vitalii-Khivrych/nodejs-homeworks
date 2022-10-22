const express = require("express");

const router = express.Router();

const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers/users");
const { auth, validateBody } = require("../../middlewares");
const { schema } = require("../../models/user");

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/",
  auth,
  validateBody(schema.subscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
