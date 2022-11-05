const express = require("express");

const router = express.Router();

const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers/users");
const { auth, validateBody, upload } = require("../../middlewares");
const { schema } = require("../../models/user");

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.post(
  "/verify",
  validateBody(schema.verifyEmailSchema),
  ctrlWrapper(ctrl.resendVerificationEmail)
);

router.patch(
  "/",
  auth,
  validateBody(schema.subscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

router.patch("/avatars", auth, upload.single("avatars"), ctrlWrapper(ctrl.updateAvatar));

module.exports = router;
