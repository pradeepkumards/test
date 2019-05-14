const expect = require('chai').expect;
const MongoClient = require('mongodb').MongoClient;
const usersDAO = require('./users.dao');
const initializeMongooseConnection = require('../../../dbConnection');
const uuidv4 = require('uuid/v4');

let mockUsersObj = {
  "name": "New User 1",
  "emailId": "user1@user.com",
  "password": "user1Password"
};

let dbConnection;
let firstUserId;
let secondUserId;
let firstNoteId = uuidv4();
let secondNoteId = uuidv4();

describe('Users DAO Layer Test Cases', function() {

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

  describe('Test scenarios for Users', function() {
    it('Add new valid user from mock user object', function(done) {
      firstUserId = uuidv4();
      mockUsersObj.userId = firstUserId;
      usersDAO.addUser(mockUsersObj, (err, response) => {
        if (err) return done(err);
        expect(response.message).to.equal("User added successfully.");
        done();
      });
    });
    it('Try adding new valid user but a duplicate for mock user object', function(done) {
      mockUsersObj.userId = uuidv4();      
      usersDAO.addUser(mockUsersObj, (err) => {
        expect(err).not.equal(undefined);
        expect(err).to.be.contain("Error while adding a new User");
        done();
      });
    });
		it('Add one more new valid user from mock user object', function(done) {
      mockUsersObj = {
        "name": "New User 2",
        "emailId": "user2@user.com",
        "password": "user2Password"
      };
      secondUserId = uuidv4();
      mockUsersObj.userId = secondUserId;
      usersDAO.addUser(mockUsersObj, (err, response) => {
        if (err) return done(err);
        expect(response.message).to.equal("User added successfully.");
        done();
      });
    });
		it('Add invalid user (invalid fields)', function(done) {      
      usersDAO.addUser({}, (err) => {
        expect(err).not.equal(undefined);
        expect(err).to.be.contain("Error while adding a new User ValidationError");
        done();
      });
    });
		it('Add user without values for mandatory fields', function(done) {
      mockUsersObj.userId = uuidv4();
      mockUsersObj.emailId = "";      
      usersDAO.addUser(mockUsersObj, (err) => {        
        expect(err).not.equal(undefined);
        expect(err).to.be.contain("Error while adding a new User ValidationError");
        done();
      });
    });
    it('Add a valid note to a user', function(done){
      usersDAO.addNoteToUser(firstUserId, firstNoteId, (err, response) => {
        if (err) return done(err);
        expect(response).not.equal(undefined);
        expect(response.message).equal("Added note to a user.");
        done();
      });
    });
    it('Add one more valid note to a user', function(done){
      usersDAO.addNoteToUser(firstUserId, secondNoteId, (err, response) => {
        if (err) return done(err);
        expect(response).not.equal(undefined);
        expect(response.message).equal("Added note to a user.");
        done();
      });
    });
    it('Remove a specific note for a user', function(done){
      usersDAO.removeNoteFromUser(firstUserId, secondNoteId, (err, response) => {
        if (err) return done(err);
        expect(response).not.equal(undefined);
        expect(response.message).equal("Removed note from User.");
        done();
      });
    });
	});
});