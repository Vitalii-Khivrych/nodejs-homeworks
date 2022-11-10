const { User } = require("../../models");
const { RequestError, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(404, "Not found");
  }

  if (user.verify) {
    throw RequestError(400, "Verification has already been passed");
  }

  const verificationEmail = {
    to: email,
    subject: "Підтверження реєстрації",
    html: `<a href="${BASE_URL}/api/users/verify/${user.verificationToken}" target="_blank">
              Підтвердіть пошту
          </a>`,
  };
  await sendEmail(verificationEmail);

  res.json({ message: "Verification email sent" });
};
module.exports = resendVerificationEmail;
