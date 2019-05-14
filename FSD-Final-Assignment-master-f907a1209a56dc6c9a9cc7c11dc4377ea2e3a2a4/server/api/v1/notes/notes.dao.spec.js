const expect = require('chai').expect;
const MongoClient = require('mongodb').MongoClient;

const notesDAO = require('./notes.dao');

const initializeMongooseConnection = require('../../../dbConnection');

const uuidv4 = require('uuid/v4');

let mockNotesObj = { 
  "title": "Test Notes",
  "description": "Test Notes Description",
  "isFavourite": false
};

let dbConnection;
let firstUserId;
let secondUserId;
let firstNoteId;
let secondNoteId;
let thirdNoteId;

describe('Notes DAO Layer Test Cases', function() {

  before(function(done) {
    initializeMongooseConnection();
    MongoClient.connect(process.env.MONGO_URL, (err, client) => {
      if(err) return done(err);
      dbConnection = client.db();
      done();
    });
  });

  after(function(done) {
    dbConnection = undefined;
    done();=
  });

  describe('Test scenarios for Notes', function() {
    it('Add new valid note from mock for a user', function(done) {
      firstNoteId = uuidv4();
      mockNotesObj.noteId = firstNoteId;
      const userId = uuidv4();
      firstUserId = userId;
      notesDAO.addNote(userId, mockNotesObj, (err, response) => {
        if (err) return done(err);
        expect(response.message).to.equal("Note added successfully.");
        done();
      });
    });
    it('Try adding new valid note but a duplicate for same user', function(done) {
      mockNotesObj.noteId = uuidv4();      
      notesDAO.addNote(firstUserId, mockNotesObj, (err) => {
        expect(err).not.equal(undefined);
        expect(err).to.be.contain("Error while adding a new Note");
        done();
      });
    });
		it('Add one more new valid note from mock for a user', function(done) {
      secondNoteId = uuidv4();
      mockNotesObj.noteId = secondNoteId;
      mockNotesObj.title = "Test Notes2";
      mockNotesObj.description = "Test Notes2 Description";      
      notesDAO.addNote(firstUserId, mockNotesObj, (err, response) => {
        if (err) return done(err);
        expect(response.message).to.equal("Note added successfully.");
        done();
      });
    });
		it('Add new valid note from mock for a different user', function(done) {
      thirdNoteId = uuidv4();
      mockNotesObj.noteId = thirdNoteId;
      const userId = uuidv4();
      secondUserId = userId;
      notesDAO.addNote(userId, mockNotesObj, (err, response) => {
        if (err) return done(err);
        expect(response.message).to.equal("Note added successfully.");
        done();
      });
    });
		it('Add invalid note (invalid fields) for a user', function(done) {      
      const userId = uuidv4();      
      notesDAO.addNote(userId, {}, (err) => {
        expect(err).not.equal(undefined);
        expect(err).to.be.contain("Error while adding a new Note ValidationError");
        done();
      });
    });
		it('Add notes without values for mandatory fields for a user', function(done) {
      mockNotesObj.noteId = uuidv4();
      mockNotesObj.title = "";
      const userId = uuidv4();      
      notesDAO.addNote(userId, mockNotesObj, (err) => {        
        expect(err).not.equal(undefined);
        expect(err).to.be.contain("Error while adding a new Note ValidationError");
        done();
      });
    });
		it('Get a specific note, which was previously added for a user', function(done) {
      notesDAO.getNote(firstUserId, firstNoteId, (err, response) => {
        if (err) return done(err);
        expect(response.title).to.equal("Test Notes");
        done();
      });
    });
		it('Get a specific note, which was previously added for a different user', function(done) {
      notesDAO.getNote(secondUserId, thirdNoteId, (err, response) => {
        if (err) return done(err);
        expect(response.title).to.equal("Test Notes2");
        done();
      });
    });
		it('Get a specific note, without valid noteId for a user', function(done) {
      notesDAO.getNote(firstUserId, 0, (err, response) => {
        if (err) return done(err);
        expect(response).to.equal(null);
        done();
      });
    });
		it('Toggle favorite status of a note for a user', function(done) {      
      notesDAO.toggleNoteFavStatus(firstUserId, firstNoteId, (err, response) => {
        if (err) return done(err);
        expect(response).not.equal(undefined);
        expect(response.message).equal("Note toggled successfully.");
        done();
      });
    });
		it('Update a specific note for content for a user', function(done) {
      mockNotesObj.title = "Test Updated Notes2";
      mockNotesObj.description = "Test Updated Notes2 Description";
      notesDAO.updateNoteDetails(firstUserId, secondNoteId, mockNotesObj, false, (err, response) => {
        if (err) return done(err);
        expect(response).not.equal(undefined);
        expect(response.message).equal("Note updated successfully.");
        done();
      });
    });
    it('Share a note for a specific user', function (done) {
      let accessType = "READONLY";
      notesDAO.addUserToNote(firstUserId, firstNoteId, accessType, (err, response) => {
        if (err) return done(err);
        expect(response).not.equal(undefined);
        expect(response.message).equal("Added user to a note.");
        done();
      });
    });
    it('Share a note for a differrent user', function (done) {
      let accessType = "FULL";
      notesDAO.addUserToNote(secondUserId, firstNoteId, accessType, (err, response) => {
        if (err) return done(err);
        expect(response).not.equal(undefined);
        expect(response.message).equal("Added user to a note.");
        done();
      });
    });
		it('Find notes of a specific user', function(done) {
      notesDAO.findNotes(firstUserId, { limit: 3, page: 1, order: 'desc' }, (err, response) => {       
        if (err) return done(err);
        expect(response.length).above(0);
        done();
      });
    });
		it('Find notes of a specific different user', function(done) {
      notesDAO.findNotes(secondUserId, { limit: 3, page: 1, order: 'desc' }, (err, response) => {       
        if (err) return done(err);
        expect(response.length).above(0);
        done();
      });
    });
		it('Find notes of a specific title for a user', function(done) {
      notesDAO.findNotes(firstUserId, { title: 'Test Notes' }, (err, response) => {       
        if (err) return done(err);
        expect(response.length).above(0);
        done();
      });
    });
		it('Get specific note for a user', function(done) {
      notesDAO.getNote(firstUserId, firstNoteId, (err, response) => {
        if (err) return done(err);
        expect(response.title).to.equal("Test Notes");
        done();
      });
    });
		it('Get specific note for a different user', function(done) {
      notesDAO.getNote(secondUserId, thirdNoteId, (err, response) => {
        if (err) return done(err);
        expect(response.title).to.equal("Test Notes2");
        done();
      });
    });
		it('Get note by passing invalid noteId for a user', function(done) {
      notesDAO.getNote(firstUserId, "abcde-12345-zyxwv", (err, response) => {
        if (err) return done(err);
        expect(response).to.equal(null);
        done();
      });
    });
    it('Delete a note for a specific user', function (done) {
      notesDAO.deleteNote(firstUserId, secondNoteId, (err, response) => {
        if (err) return done(err);
        expect(response).not.equal(undefined);
        expect(response.message).equal("Note deleted successfully.");
        done();
      });
    });
	});
});