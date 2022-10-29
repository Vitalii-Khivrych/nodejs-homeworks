const { Contact } = require("../../models");
const { RequestError } = require("../../helpers");

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const result = await Contact.findOneAndDelete({ contactId, owner: _id });
  console.log(result);

  if (!result) {
    throw RequestError(404, "Not found");
  }

  res.json({ message: "contact deleted" });
};

module.exports = deleteById;
