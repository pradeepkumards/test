const groupsDao = require('./groups.dao');
const uuidv4 = require('uuid/v4');
const logger = require('../../../logger');

// Handler to create new group
function addGroup(userId, newGroupObj, done) {
  logger.info("Inside service method - create new group");
  newGroupObj.groupId = uuidv4();
  groupsDao.createGroup(userId, newGroupObj, done);
}

// Handler to update existing group
function updateGroup(userId, groupId, updatedGroupObj, done) {
  logger.info("Inside service method - update existing group");
  groupsDao.updateGroup(userId, groupId, updatedGroupObj, done);
}

// Handler to delete existing group
function deleteGroup(userId, groupId, done) {
  logger.info("Inside service method - update existing group");
  groupsDao.deleteGroup(userId, groupId, done);
}

// Handler to add note to a group
function addNoteToGroup(userId, groupId, noteId, done) {
	logger.info("Inside service method - add note to a group");
  groupsDao.addNoteToGroup(userId, groupId, noteId, done);
}

// Handler to remove note from a group
function removeNoteFromGroup(userId, groupId, noteId, done) {
  logger.info("Inside service method - remove note from a group");
  groupsDao.removeNoteFromGroup(userId, groupId, noteId, done);
}

// Handler to get group by Id
function getGroupById(userId, groupId, done) {
  logger.info("Inside service method - get group by groupId");
  groupsDao.getGroup(userId, groupId, done);
}

// Handler to get group by title 
function getGroupByTitle(userId, title, done) {
  logger.info("Inside service method - get group by title");
  groupsDao.getGroupByTitle(userId, title, done);
}

// Handler to get all groups
function getGroups(userId, done) {
  logger.info("Inside service method - get all groups");
  groupsDao.getGroups(userId, done);
}

module.exports = {
  addGroup,
  updateGroup,
  deleteGroup,
  addNoteToGroup,
  removeNoteFromGroup,
  getGroupById,
  getGroupByTitle,
  getGroups
}