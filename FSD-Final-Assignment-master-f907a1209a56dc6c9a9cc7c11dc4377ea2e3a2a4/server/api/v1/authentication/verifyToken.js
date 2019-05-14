const jsonwt = require('jsonwebtoken');
const logger = require('../../../logger');

function verifyToken(token, secret, options, done) {
  logger.info("Inside method - verifyToken");
  jsonwt.verify(token, secret, options, done);
}

module.exports = verifyToken;