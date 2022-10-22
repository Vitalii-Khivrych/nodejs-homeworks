const jwt = require("jsonwebtoken");

const { User } = require("../models/user");
const { RequestError } = require("../helpers");

const { SECRET_KEY } = process.env;

const auth = async (req, _, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      next(RequestError(401, "Not authorized"));
    }

    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token) {
      next(RequestError(401, "Not authorized"));
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.message === "Invalid signature" || err.message === "invalid token") {
      next(RequestError(401, "Not authorized"));
    }

    next(err);
  }
};

module.exports = auth;
