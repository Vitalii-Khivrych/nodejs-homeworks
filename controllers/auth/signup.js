const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

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
  const avatarURL = gravatar.url(email);
  const newUser = await User.create({ name, email, password: hashPassword, avatarURL });

  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
};

module.exports = signup;
