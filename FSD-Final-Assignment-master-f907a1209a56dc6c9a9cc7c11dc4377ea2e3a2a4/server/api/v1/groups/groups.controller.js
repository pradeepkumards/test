const groupsService = require('./groups.service');
const logger = require('../../../logger');

// Handler to create new group
function addGroup(userId, newGroupObj, done) {
  logger.info("Inside controller method - create new group");
  if (!newGroupObj.title) return done("Please provide all Mandatory fields");
  groupsService.addGroup(userId, newGroupObj, done);
}

// Handler to update existing group
function updateGroup(userId, groupId, updatedGroupObj, done) {
  logger.info("Inside controller method - update existing group");
  groupsService.updateGroup(userId, groupId, updatedGroupObj, done);
}

// Handler to delete existing group
function deleteGroup(userId, groupId, done) {
  logger.info("Inside controller method - update existing group");
  groupsService.deleteGroup(userId, groupId, done);
}

// Handler to add note to a group
function addNoteToGroup(userId, groupId, noteId, done) {
  logger.info("Inside controller method - add note to a group");
  groupsService.addNoteToGroup(userId, groupId, noteId, done);
}

// Handler to remove note from a group
function removeNoteFromGroup(userId, groupId, noteId, done) {
  logger.info("Inside controller method - remove note from a group");
  groupsService.removeNoteFromGroup(userId, groupId, noteId, done);
}

// Handler to get group by Id
function getGroupById(userId, groupId, done) {
  logger.info("Inside controller method - get group by groupId");
  groupsService.getGroupById(userId, groupId, done);
}

// Handler to get group by title 
function getGroupByTitle(userId, title, done) {
  logger.info("Inside controller method - get group by title");
  groupsService.getGroupByTitle(userId, title, done);
}

// Handler to get all groups
function getGroups(userId, done) {
  logger.info("Inside controller method - get all groups");
  groupsService.getGroups(userId, done);
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