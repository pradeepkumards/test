const notesModel = require('./notes.model');
const logger = require('../../../logger');

// Handler to add new note
function addNote(userId, newNoteObj, done) {
  logger.info("Inside DAO method - add new note");
  let noteObj = new notesModel();
  noteObj.noteId = newNoteObj.noteId;
  noteObj.userId = userId;
  noteObj.title = newNoteObj.title;
  noteObj.description = newNoteObj.description;
  noteObj.isFavourite = newNoteObj.isFavourite;

  noteObj.save((err, savedNoteObj) => {
    if (err) return done(`Error while adding a new Note ${err}.`);
    return done(null, { response: savedNoteObj, message: "Note added successfully." });
  });
}

// Handler to delete existing note
function deleteNote(userId, noteId, done) {
  logger.info("Inside DAO method - delete existing note");
  notesModel.findOneAndRemove({
    userId: userId,
    noteId: noteId
  }, (err, deletedNoteObj) => {
    if (err) return done(`Error while deleting a particular Note ${err}.`);    
    return done(null, { response: deletedNoteObj, message: "Note deleted successfully." });
  });
}

// Handler to update existing note
function updateNoteDetails(userId, noteId, updateNoteObj, toggleFlag = false, done) {
  logger.info("Inside DAO method - update existing note");
  notesModel.findOneAndUpdate({
    userId: userId,
    noteId: noteId
  }, updateNoteObj, {new: true},(err, modifiedNoteObj) => {
    let errMessage;
    let successMessage;
    if (toggleFlag) {
      errMessage = "Error while toggling a particular Note";
      successMessage = "Note toggled successfully.";
    } else {
      errMessage = "Error while updating a particular Note";
      successMessage = "Note updated successfully.";
    }
    if (err) return done(`${errMessage} ${err}.`);
    return done(null, { response: modifiedNoteObj, message: successMessage });
  });
}

// Handler to add note to favorites
function toggleNoteFavStatus(userId, noteId, done) {
  logger.info("Inside DAO method - add note to favorite");
  notesModel.findOne({
    userId: userId,
    noteId: noteId
  }, (err, noteObj) => {
    if (err) return done(`Error while getting a particular Note for isFavourite field toggle ${err}.`);
    let updateNoteObj = noteObj;
    updateNoteObj.isFavourite = !noteObj.isFavourite;

    updateNoteDetails(userId, noteId, updateNoteObj, true, done);
    return;
  });
}

// Handler to get particular note
function getNote(userId, noteId, done) {
  logger.info("Inside DAO method - get note");
  notesModel.findOne({
    userId: userId,
    noteId: noteId
  }, (err, noteObj) => {
    if (err) return done(`Error while retrieving a Note by id ${err}.`);
    return done(null, noteObj);
  });
}

// Handler to search notes
function findNotes(userId, {title, favourite, limit, page, order}, done) {
  logger.info("Inside DAO method - search notes");
  limit = limit || 10;
  page = page || 1;
  order = order || 1;
  let searchDataInput = {
    $or: [{
      userId: userId
    }, {
      'sharedNotes.userId': {
        $eq: userId
      }
    }]
  };

  if (title) searchDataInput.title = title;
  if(favourite!=null && favourite!="" && favourite!=undefined)searchDataInput.isFavourite=favourite;

  notesModel
    .find(searchDataInput)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ modifiedOn: order })
    .lean()
    .exec((err, notes) => {
      if (err) return done(`Error while retrieving a Notes based on search criteria ${err}.`);
      let newNotesData = notes.map(function(note) {
        if (note.userId === userId) {
          note.role = "SELF";
        } else {
          note.role = note.sharedNotes.userRole;
        }
        return note;
      });
      return done(null, newNotesData);
  });
}

// Handler to share notes to user
function addUserToNote(userId, noteId, accessType, done) { 
  logger.info("Inside DAO method - share notes");
  notesModel.findOneAndUpdate({
    noteId: noteId,
    'sharedNotes.userId': {
      $nin: [userId]
    }
  },
  {
    $push: {
      sharedNotes: {"userId": userId, "userRole": accessType}
    }
  }, (err, updatedNoteObj) => {
      if (err) return done(`Error while adding user to a Note ${err}.`);
      return done(null, { response: updatedNoteObj, message: "Added user to a note." });
  });
}


function removeUserFromNote(userId, noteId, done) {  
  logger.info("DAO function of removeUserFromNote");
  notesModel.findOneAndUpdate({
    noteId: noteId
  },
  {
    $pull: {
      'sharedNotes.userId': {
        $in: userId
      }
    }
  }, (err, removedNoteObj) => {
    if (err) return done(`Error while removing user from a note ${err}.`);
    return done(null, { response: removedNoteObj, message: "Removed user from note." });
  });
}

module.exports = {  
  addNote,
  deleteNote,
  updateNoteDetails,
  toggleNoteFavStatus,
  getNote,
  findNotes,
  addUserToNote,
  removeUserFromNote
}