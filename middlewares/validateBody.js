const { RequestError } = require("../helpers");

const validateBody = (schema) => {
  const func = async (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      switch (req.method) {
        case "POST":
          next(RequestError(400, "Ошибка от Joi или другой библиотеки валидации"));
          break;

        case "PUT":
          next(RequestError(400, "missing fields"));
          break;

        case "PATCH":
          next(RequestError(400, "missing field favorite"));
          break;

        default:
          next(RequestError(400, error.message));
      }
    }
    next();
  };

  return func;
};

module.exports = validateBody;
