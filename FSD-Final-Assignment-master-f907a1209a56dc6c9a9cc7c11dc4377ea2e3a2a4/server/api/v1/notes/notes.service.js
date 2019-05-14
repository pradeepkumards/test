const notesDao = require('./notes.dao');
const uuidv4 = require('uuid/v4');
const logger = require('../../../logger');

// Handler to add new note
function addNote(userId, newNoteObj, done) {
  logger.info("Inside service method - add new note");
  newNoteObj.noteId = uuidv4();
  notesDao.addNote(userId, newNoteObj, done);
}

// Handler to delete existing note
function deleteNote(userId, noteId, done) {
  logger.info("Inside service method - delete existing note");
  notesDao.deleteNote(userId, noteId, done);
}

// Handler to update existing note
function updateNote(userId, noteId, updateNoteObj, done) {
  logger.info("Inside service method - update existing note");
  notesDao.updateNoteDetails(userId, noteId, updateNoteObj, false, done);
}

// Handler to get note by noteId
function getNoteByNoteId(userId, noteId, done){
	logger.info("Inside service method - get note by noteId");
    notesDao.getNote(userId, noteId, done);
}

// Handler to add note to favorites
function addNoteToFavorites(userId, noteId, done) {
  logger.info("Inside service method - add note to favorite");
  notesDao.toggleNoteFavStatus(userId, noteId, done);
}

// Handler to search notes
function searchNotes(userId, searchDataInput, done) {
  logger.info("Inside service method - search notes");
  notesDao.findNotes(userId, searchDataInput, done);
}

// Handler to share notes to user
function shareUserToNote(userId, noteId, accessType, done) {
  logger.info("Inside service method - share notes");
  notesDao.addUserToNote(userId, noteId, accessType, done);
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