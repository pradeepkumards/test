const config = require('../../../appConfig');
const jsonwt = require('jsonwebtoken');
const logger = require('../../../logger');

function signToken(userObj, done) {
  logger.info("Inside method - signToken");
  let payload = {
    id: userObj.userId,
    name: userObj.name,
    email: userObj.emailId
  };

  let secret = config.JWT_SECRET_KEY;

  let options = {    
    expiresIn: '1h'
  };

  jsonwt.sign(payload, secret, options, done);
}

module.exports = signToken;