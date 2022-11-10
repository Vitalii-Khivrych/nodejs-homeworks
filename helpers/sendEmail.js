const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;

const { SEND_FROM_EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: SEND_FROM_EMAIL };

  try {
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw error.message;
  }
};

module.exports = sendEmail;
