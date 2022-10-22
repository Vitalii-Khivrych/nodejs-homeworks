const bcrypt = require("bcrypt");

const { User } = require("../../models");
const { RequestError } = require("../../helpers");

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(409, "Email in use");
  }

  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(password, saltRounds);
  const newUser = await User.create({ name, email, password: hashPassword });

  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = signup;
