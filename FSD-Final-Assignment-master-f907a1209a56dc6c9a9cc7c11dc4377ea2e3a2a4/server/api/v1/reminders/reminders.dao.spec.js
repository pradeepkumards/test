const expect = require('chai').expect;
const MongoClient = require('mongodb').MongoClient;

const remindersDAO = require('./reminders.dao');

const initializeMongooseConnection = require('../../../dbConnection');

const uuidv4 = require('uuid/v4');
const moment = require('moment');
const dateFormat = 'YYYY-MM-DD';
const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';

let mockReminderObj = { 
  "startDateTime": moment().add(1, 'h').format(dateTimeFormat),
  "endDateTime": moment().add(1, 'y').format(dateTimeFormat),
  "frequency": "daily"
};

let dbConnection;
let firstReminderId;
let secondReminderId;
let firstUserId;
let secondUserId;
let firstNoteId;
let secondNoteId;

describe('Reminders DAO Layer Test Cases', function() {

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
    done();
  });

  describe('Test scenarios for Reminders', function() {
    it('Add new valid reminder from mock for a user & note', function(done) {
      firstReminderId = uuidv4();
      const noteId = uuidv4();
      firstNoteId = noteId
      mockReminderObj.reminderId = firstReminderId;
      mockReminderObj.noteId = noteId;
      const userId = uuidv4();
      firstUserId = userId;
      remindersDAO.createReminder(userId, mockReminderObj, (err, response) => {
        if (err) return done(err);
        expect(response.message).to.equal("Reminder added sucessfully.");
        done();
      });
    });
    it('Add new valid reminder from mock for a different user & note', function(done) {
      secondReminderId = uuidv4();
      const noteId = uuidv4();
      secondNoteId = noteId;
      mockReminderObj.reminderId = secondReminderId;
      mockReminderObj.noteId = noteId;
      const userId = uuidv4();
      secondUserId = userId;
      remindersDAO.createReminder(userId, mockReminderObj, (err, response) => {
        if (err) return done(err);
        expect(response.message).to.equal("Reminder added sucessfully.");
        done();
      });
    });   
		it('Add invalid reminder (invalid fields) for a user & note', function(done) {      
      const userId = uuidv4();      
      remindersDAO.createReminder(userId, {}, (err) => {
        expect(err).not.equal(undefined);
        expect(err).to.be.contain("Error while creating a new Reminder ValidationError");
        done();
      });
    });
		it('Add reminder without values for mandatory fields for a user & note', function(done) {
      mockReminderObj.reminderId = uuidv4();
      mockReminderObj.noteId = firstNoteId;
      mockReminderObj.startDateTime = "";
      const userId = uuidv4();      
      remindersDAO.createReminder(userId, mockReminderObj, (err) => {        
        expect(err).not.equal(undefined);
        expect(err).to.be.contain("Error while creating a new Reminder ValidationError");
        done();
      });
    });
		it('Get a specific reminder, which was previously added for a user & note', function(done) {
      remindersDAO.getReminder(firstUserId, firstNoteId, (err, response) => {
        if (err) return done(err);
        expect(response.frequency).to.equal("daily");
        done();
      });
    });
		it('Get a specific reminder, without valid noteId for a user & note', function(done) {
      remindersDAO.getReminder(firstUserId, 0, (err, response) => {
        if (err) return done(err);
        expect(response).to.equal(null);
        done();
      });
    });
		it('Update a specific reminder for a user & note', function(done) {
      mockReminderObj.startDateTime = moment("2018-07-15 10:10:00").toISOString();
      mockReminderObj.endDateTime = moment("2019-07-15 10:10:00").toISOString();
      remindersDAO.updateReminderDetails(firstUserId, firstNoteId, mockReminderObj, (err, response) => {
        if (err) return done(err);
        expect(response).not.equal(undefined);
        expect(response.message).equal("Reminder updated successfully.");
        done();
      });
    });
		it('Get note by passing invalid noteId for a user & note', function(done) {
      remindersDAO.getReminder(firstUserId, "abcde-12345-zyxwv", (err, response) => {
        if (err) return done(err);
        expect(response).to.equal(null);
        done();
      });
    });
    it('Delete a reminder for a specific user & note', function (done) {
      remindersDAO.deleteReminder(firstUserId, firstNoteId, (err, response) => {
        if (err) return done(err);
        expect(response).not.equal(undefined);
        expect(response.message).equal("Reminder deleted successfully.");
        done();
      });
    });
    it('Get a reminders for a specific date', function (done) {
      let currentDate = moment().format(dateFormat);
      remindersDAO.getReminderByDate(currentDate, (err, response) => {
        if (err) return done(err);
        expect(response).not.equal(undefined);
        expect(response.length).above(0);
        done();
      });
    });
	});
});