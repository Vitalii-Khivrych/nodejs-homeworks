const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const { auth, validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", auth, isValidId, ctrlWrapper(ctrl.getById));

router.post("/", auth, validateBody(schemas.addSchema), ctrlWrapper(ctrl.add));

router.delete("/:contactId", auth, isValidId, ctrlWrapper(ctrl.deleteById));

router.put(
  "/:contactId",
  auth,
  isValidId,
  validateBody(schemas.updateContactSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  auth,
  isValidId,
  validateBody(schemas.updateStatusSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
