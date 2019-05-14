const router = require('express').Router();
const usersCtrl = require('./users.controller');
const logger = require('../../../logger');

// Handler to register user
router.post('/register', function(req, res) {
  logger.info("Inside router method - register user");
  try {
    let userObj = req.body;
    usersCtrl.registerUser(userObj, (err, result) => {
      if (err) {
        logger.error(`Error in routing to Register ${err}`);
        return res.status(500).send({ error: err });
      }      
      return res.send(result);
    })
  } catch (err) {
    logger.error(`Error in catch block routing to Register ${err}`);
    return res.status(500).send({ error: `Something went wrong, please try later..! ${err}` });
  }
});

// Handler to login user
router.post('/login', function(req, res) {
  logger.info("Inside router method - login user");
  try {   
    let credentials = req.body;
    if (!credentials) return res.status(400).send({ error: 'Email Id & Password are mandatory.' });
    usersCtrl.authenticate(credentials, (err, result) => {
      if (err) {
        logger.error(`Error in routing to Login ${err}`);
        return res.status(500).send({ error: err });
      }      
      return res.send(result);
    })
  } catch (err) {
    logger.error(`Error in catch block routing to Login ${err}`);
    return res.status(500).send({ error: `Something went wrong, please try later..! ${err}` });
  }
});

// Handler to check whether user is authenticated or not
router.post('/isAuthenticated', usersCtrl.isAuthenticated);

// Handler to logout user
router.post('/logout', function(req, res) {
  logger.info("Inside router method - logout user");
  res.send({ message: 'you logged out' });
});

module.exports = router;