const nodemailer = require('nodemailer');
const config = require('../appConfig');
const logger = require('../logger');

function notifyEmail(mailOptions, done) {
  logger.info("Inside function notifyEmail");
  let transporter = nodemailer.createTransport(config.EMAIL_CONFIGURATION);
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return logger.error(error);
    }
    logger.info('Message %s sent: %s', info.messageId, info.response);
    logger.info('Preview URL: %s', nodemailer.getTestMessageUrl(info));
	return done(null,"Email sent.");
  });
}

module.exports = {
  notifyEmail
}