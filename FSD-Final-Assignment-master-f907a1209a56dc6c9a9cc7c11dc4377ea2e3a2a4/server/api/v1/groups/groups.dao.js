const groupsModel = require('./groups.model');
const logger = require('../../../logger');

// Handler to create new group
function createGroup(userId, newGroupObj, done) {
  logger.info("Inside DAO method - create new group");
  let groupObj = new groupsModel();
  groupObj.groupId = newGroupObj.groupId;
  groupObj.userId = userId;
  groupObj.title = newGroupObj.title;
  groupObj.description = newGroupObj.description;
  groupObj.notes = newGroupObj.notes;

  groupObj.save((err, savedGroupObj) => {
    if (err) return done(`Error while creating a new Group ${err}.`);
    return done(null, { response: savedGroupObj, message: "Group added sucessfully." });
  });
}

// Handler to update existing group
function updateGroup(userId, groupId, updatedGroupObj, done) {
  logger.info("Inside DAO method - update group");
  let whereClause = {
    userId: userId,
    groupId: groupId
  };
  groupsModel.findOneAndUpdate(whereClause, updatedGroupObj, {new: true},(err, modifiedGroupObj) => {    
    if (err) return done(`Error while updating a particular Group ${err}.`);
    return done(null, { response: modifiedGroupObj, message: "Group updated successfully." });
  });
}

// Handler to delete existing group
function deleteGroup(userId, groupId, done) {
  logger.info("Inside DAO method - delete group");
  groupsModel.findOneAndRemove({
    userId: userId,
    groupId: groupId
  }, (err, deletedGroupObj) => {
    if (err) return done(`Error while deleting a particular Group ${err}.`);  
    return done(null, { response: deletedGroupObj, message: "Group deleted successfully." });
  });
}

// Handler to add note to a group
function addNoteToGroup(userId, groupId, noteId, done) {
  logger.info("Inside DAO method - add note to a group");
  logger.info(noteId);
  groupsModel.findOneAndUpdate({
    userId: userId,
    groupId: groupId,
	notes: {
      $nin: [noteId]
    }
  },
  {
    $push: {
      notes: noteId
    }
  }, {new: true},(err, updatedGroupObj) => {
      if (err) return done(`Error while adding note to a Group ${err}.`);
      return done(null, { response: updatedGroupObj, message: "Added note to group successfully." });
  });
}

// Handler to remove note from a group
function removeNoteFromGroup(userId, groupId, noteId, done) {
  logger.info("Inside DAO method - remove note from a group");
  groupsModel.findOneAndUpdate({
    userId: userId,
    groupId: groupId,
	notes: {
      $in: [noteId]
    }
  },
  {
    $pull: {
      notes: noteId
    }
  }, {new: true},(err, removedGroupObj) => {
    if (err) return done(`Error while removing note from a Group ${err}.`);
    return done(null, { response: removedGroupObj, message: "Removed note from group successfully." });
  });
}

// Handler to get a specific group by Id
function getGroup(userId, groupId, done) {
  logger.info("Inside DAO method - get Group");
  groupsModel.findOne({
    userId: userId,
    groupId: groupId
  }, (err, groupObj) => {
    if (err) return done(`Error while retrieving a Group ${err}.`);
    return done(null, groupObj);
  });
}

// Handler to get a specific group by Title
function getGroupByTitle(userId, title, done) {
  logger.info("Inside DAO method - get Group");
  groupsModel.findOne({
    userId: userId,
    title: title
  }, (err, groupObj) => {
    if (err) return done(`Error while retrieving a Group ${err}.`);
    return done(null, groupObj);
  });
}

// Handler to get all groups
function getGroups(userId, done) {
  logger.info("Inside DAO method - get group by title");
   groupsModel.find({
    userId: userId
  }, (err, groupObj) => {
    if (err) return done(`Error while retrieving Groups ${err}.`);
    return done(null, groupObj);
  });
}

module.exports = {  
  createGroup,
  updateGroup,
  deleteGroup,
  addNoteToGroup,
  removeNoteFromGroup,
  getGroup,
  getGroupByTitle,
  getGroups
}