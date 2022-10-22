const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const { _id } = req.user;

  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;

  const filterValue = favorite ? { owner: _id, favorite } : { owner: _id };

  const result = await Contact.find(filterValue, "", {
    skip: skip,
    limit: parseInt(limit, 10),
  })
    .populate("owner", "_id name email")
    .exec();

  res.json(result);
};

module.exports = getAll;
