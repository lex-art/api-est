const nodemailer = require("nodemailer");

module.exports = () => {
  return nodemailer.createTransport({
    host: process.env.HOST_EMAIL,
    port: process.env.PORT_HOST_EMAIL,
    secure: false,
    auth: {
      user: process.env.ACCOUNT_EMAIL,
      pass: process.env.PASS_EMAIL
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};
