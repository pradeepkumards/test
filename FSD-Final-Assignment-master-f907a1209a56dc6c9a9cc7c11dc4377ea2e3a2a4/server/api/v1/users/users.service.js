const usersDao = require('./users.dao');
const uuidv4 = require('uuid/v4');
const logger = require('../../../logger');

// Handler to register user
function registerUser(newUserObj, done) {
  logger.info("Inside service method - register user");
  newUserObj.userId = uuidv4();
  usersDao.addUser(newUserObj, done);
}

// Handler to find user by email id
function findUser(emailId, done) {
  logger.info("Inside service method - find user by email id");
  usersDao.getUserbyEmail(emailId, done);
}

// Handler to find user by user id
function findUserById(userId, done) {
  logger.info("Inside service method - find user by id");
  usersDao.getUserbyId(userId, done);
}

// Handler to share notes to user
function shareNoteToUser(userId, noteId, done) {
  logger.info("Inside service method - share notes to user");
  usersDao.addNoteToUser(userId, noteId, done);
}

// Handler to unshare notes from user
function unShareNoteFromUser(userId, noteId, done) {
  logger.info("Inside service method - unshare notes from user");
  usersDao.removeNoteFromUser(userId, noteId, done);
}

module.exports = {
  registerUser,
  findUser,
  findUserById,
  shareNoteToUser,
  unShareNoteFromUser
}