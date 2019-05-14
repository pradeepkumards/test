const async = require('async');
const notesService = require('./notes.service');
const usersCtrl = require('../users/users.controller');
const remindersCtrl = require('../reminders/reminders.controller');
const config = require('../../../appConfig');
const logger = require('../../../logger');
const notification = require('../../../utils/email.notification');

// Handler to add new note
function addNote(userId, newNoteObj, done) {
  logger.info("Inside controller method - add new note");
  if (!newNoteObj.title) return done("Please provide all Mandatory fields");
	async.waterfall([
      (cb => notesService.addNote(userId, newNoteObj, cb)),
      ((addedNoteObj, cb) => {
        if (addedNoteObj) {
          newNoteObj.noteId = addedNoteObj.response.noteId;
		  if(newNoteObj.startDateTime && newNoteObj.endDateTime && newNoteObj.frequency){
			remindersCtrl.addReminder(userId, newNoteObj, cb);
		  }
		  else{
			return cb(null, {message: "Note added successfully."});
		  }
		}
      })
    ], (err, result) => {
      return done(err, {message: "Note added successfully."});
    });
}

// Handler to delete existing note
function deleteNote(userId, noteId, done) {
  logger.info("Inside controller method - delete existing note");
  async.waterfall([
      (cb => notesService.deleteNote(userId, noteId, cb)),
      ((deletedNoteObj,cb) => {
		  remindersCtrl.deleteReminder(userId, noteId, cb);
      })
    ], (err, result) => {
      return done(err, {message: "Note deleted successfully."});
  });
}

// Handler to update existing note
function updateNote(userId, noteId, updateNoteObj, done) {
  logger.info("Inside controller method - update existing note");
  if (!updateNoteObj.title) return done("Please provide all Mandatory fields");

  async.waterfall([
      (cb => notesService.updateNote(userId, noteId, updateNoteObj, cb)),
      ((modifiedNoteObj, cb) => {
        if (updateNoteObj.startDateTime && updateNoteObj.endDateTime && updateNoteObj.frequency) {
          let updateReminderObj = {
            'startDateTime': updateNoteObj.startDateTime,
            'endDateTime': updateNoteObj.endDateTime,
            'frequency': updateNoteObj.frequency
          }
          remindersCtrl.updateReminder(userId, noteId, updateReminderObj, cb);
        }
      })
    ], (err, result) => {
      return done(err, {message: "Note updated successfully."});
  });
}

// Handler to get note by noteId
function getNoteByNoteId(userId, noteId, done){
	logger.info("Inside controller method - get note by noteId");
    notesService.getNoteByNoteId(userId, noteId, done);
}

// Handler to add note to favorites
function addNoteToFavorites(userId, noteId, done) {
  logger.info("Inside controller method - add note to favorite");
  notesService.addNoteToFavorites(userId, noteId, done);
}

// Handler to search notes
function searchNotes(userId, searchParams, done) {
  logger.info("Inside controller method - search notes");
  let searchDataInput = {}
  if (searchParams.title)
  { 
	searchDataInput.title = searchParams.title;
  }
  if (searchParams.favourite)
  { 
	searchDataInput.favourite = searchParams.favourite;
  }
 
  notesService.searchNotes(userId, searchDataInput, done);
}

// Handler to share notes to user
function shareUserToNote(userId, noteId, emailId, accessType, done) {
  logger.info("Inside controller method - share notes");
  var userObject = new Object();
  async.waterfall([
	  function (cb){
		  usersCtrl.findUser(emailId, cb);
	  },
	  
      function(userObj, cb){
		  userObject = userObj;
		  if(userObj && userObj.userId){
			notesService.shareUserToNote(userObj.userId, noteId, accessType, cb);
		  }
		  else
		  {
			  cb("Email Id doesn't exist");
		  }
	  },
	  
	  function (updatedNoteObj, cb){
          usersCtrl.shareNoteToUser(userId, noteId, cb);
	  },
	  
	  function(updatedUserObj, cb){
		  logger.info(updatedUserObj);
          let mailOptions = {
            "from": config.NO_REPLY,
            "to": emailId,
            "subject": "Note is shared to you",
            "html": `Dear ${userObject.name}, \n A new note has been shared to you.`
          };
          notification.notifyEmail(mailOptions, cb);
		}
    ], (err, result) => {
      return done(err, {message:"Note shared successfully."});
  });
}

module.exports = {
  addNote,
  deleteNote,
  updateNote,
  getNoteByNoteId,
  addNoteToFavorites,
  searchNotes,
  shareUserToNote
}