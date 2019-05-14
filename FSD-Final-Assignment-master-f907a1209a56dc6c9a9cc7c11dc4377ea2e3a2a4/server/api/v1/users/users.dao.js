const usersModel = require('./users.model');
const logger = require('../../../logger');

// Handler to register/add user
function addUser(newUserObj, done) {
  logger.info("Inside DAO method - add user");
  let userObj = new usersModel();
  userObj.userId = newUserObj.userId;
  userObj.name = newUserObj.name;
  userObj.emailId = newUserObj.emailId;
  userObj.password = newUserObj.password;

  userObj.save((err, savedUserObj) => {
    if (err) return done(`Error while adding a new User ${err}.`);
    return done(null, { response: savedUserObj, message: "User added successfully." });
  });
}

// Handler to get user by email id
function getUserbyEmail(emailId, done) {
  logger.info("Inside DAO method - get user by email id");
  usersModel.findOne({
    emailId: emailId
  }, (err, userObj) => {
    if (err) return done(`Error while retrieving a User by Email Id ${err}.`);
    return done(null, userObj);
  });
}

// Handler to get user by id
function getUserbyId(userId, done) {
  logger.info("Inside DAO method - get user by id");
  usersModel.findOne({
    userId: userId
  }, (err, userObj) => {
    if (err) return done(`Error while retrieving a User by User Id ${err}.`);
    return done(null, userObj);
  });
}

// Handler to add notes to user
function addNoteToUser(userId, noteId, done) { 
  logger.info("Inside DAO method - add notes to user");
  usersModel.findOneAndUpdate({
    userId: userId,
    sharedNotes: {
      $nin: [noteId]
    }
  },
  {
    $push: {
      sharedNotes: noteId
    }
  }, (err, updatedUserObj) => {
      if (err) return done(`Error while adding note to a User ${err}.`);
	  logger.info(updatedUserObj);
      return done(null, { response: updatedUserObj, message: "Added note to a user." });
  });
}

// Handler to remove notes from user
function removeNoteFromUser(userId, noteId, done) {
  logger.info("Inside DAO method - remove notes from user");
  usersModel.findOneAndUpdate({
    userId: userId
  },
  {
    $pull: {
      sharedNotes: {
        $in: noteId
      }
    }
  }, (err, removedUserObj) => {
    if (err) return done(`Error while removing note from a User ${err}.`);
    done(null, { response: removedUserObj, message: "Removed note from User." });
    return;
  });
}

module.exports = {
  addUser,
  getUserbyEmail,
  getUserbyId,
  addNoteToUser,
  removeNoteFromUser
}