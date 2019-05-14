const expect = require('chai').expect;
const MongoClient = require('mongodb').MongoClient;

const groupsDAO = require('./groups.dao');

const initializeMongooseConnection = require('../../../dbConnection');

const uuidv4 = require('uuid/v4');

const mockGroupsObj = {
  "title": "Test Group",
  "description": "Test Group Description",
  "groupIcon": "groupicon.png"
};

let dbConnection;
let firstUserId = uuidv4();
let secondUserId = uuidv4();
let firstNoteId = [uuidv4()];
let secondNoteId = [uuidv4()];
let firstGroupId;
let secondGroupId;

describe('Groups DAO Layer Test Cases', function() {

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

	describe('Test scenarios for Groups', function() {
		it('Create a new Group from mock for a user', function(done) {
      firstGroupId = uuidv4();
      mockGroupsObj.groupId = firstGroupId;
      groupsDAO.createGroup(firstUserId, mockGroupsObj, (err, response) => {
        if (err) return done(err);
        expect(response).not.equal(undefined);
        expect(response.message).equal("Group added sucessfully.");
        done();
      });
    });
		it('Add a valid note to a group for a user', function(done){
      groupsDAO.addNoteToGroup(firstUserId, firstGroupId, firstNoteId, (err, response) => {
        if (err) return done(err);
        expect(response).not.equal(undefined);
        expect(response.message).equal("Added note to group.");
        done();
      });
    });
		it('Add one more valid note to a group for a user', function(done){
      groupsDAO.addNoteToGroup(firstUserId, firstGroupId, secondNoteId, (err, response) => {
        if (err) return done(err);
        expect(response).not.equal(undefined);
        expect(response.message).equal("Added note to group.");
        done();
      });
    });
		it('Remove a specific note from a specific group for a user', function(done){
      groupsDAO.removeNoteFromGroup(firstUserId, firstGroupId, secondNoteId, (err, response) => {
        if (err) return done(err);
        expect(response).not.equal(undefined);
        expect(response.message).equal("Removed note from group.");
        done();
      });
    });
		it('Create a new Group from mock for a different user', function(done) {
      secondGroupId = uuidv4();
      mockGroupsObj.groupId = secondGroupId;
      mockGroupsObj.title = "Test Group2";
      mockGroupsObj.description = "Test Group2 Description"; 
      groupsDAO.createGroup(secondUserId, mockGroupsObj, (err, response) => {
        if (err) return done(err);
        expect(response).not.equal(undefined);
        expect(response.message).equal("Group added sucessfully.");
        done();
      });
    });
		it('Add a specific note to specific Group of a different user', function(done) {
      groupsDAO.addNoteToGroup(secondUserId, secondGroupId, firstNoteId, (err, response) => {
        if (err) return done(err);
        expect(response).not.equal(undefined);
        expect(response.message).equal("Added note to group.");
        done();
      });
    });
		it('Get groups of a specific user', function(done){
      groupsDAO.getGroup(firstUserId, firstGroupId, (err, response) => {
        if (err) return done(err);
        expect(response).not.equal(undefined);
        expect(response.title).to.equal("Test Group");
        done();
      });
    });
		it('Get groups of a specific different user', function(done){
      groupsDAO.getGroup(secondUserId, secondGroupId, (err, response) => {
        if (err) return done(err);
        expect(response).not.equal(undefined);
        expect(response.title).to.equal("Test Group2");
        done();
      });
    });
	});
});