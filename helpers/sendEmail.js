const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;

const sendFromEmail = "khivr.vitali@gmail.com";

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: sendFromEmail };

  try {
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw error.message;
  }
};

module.exports = sendEmail;
