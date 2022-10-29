const { Contact } = require("../../models");

const { RequestError } = require("../../helpers");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;

  const result = await Contact.findOneAndUpdate({ contactId, owner: _id }, req.body, { new: true });

  if (!result) {
    throw RequestError(404, "Not found");
  }

  res.json(result);
};
module.exports = updateStatusContact;
