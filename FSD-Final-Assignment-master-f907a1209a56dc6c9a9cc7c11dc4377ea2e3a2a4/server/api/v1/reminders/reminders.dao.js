const remindersModel = require('./reminders.model');
const logger = require('../../../logger');

// Handler to add reminder
function createReminder(userId, newReminderObj, done) {
  logger.info("Inside DAO method - add reminder");
  let reminderObj = new remindersModel();
  reminderObj.reminderId = newReminderObj.reminderId;
  reminderObj.noteId = newReminderObj.noteId;
  reminderObj.userId = userId;
  reminderObj.startDateTime = newReminderObj.startDateTime;
  reminderObj.endDateTime = newReminderObj.endDateTime;
  reminderObj.frequency = newReminderObj.frequency;

  reminderObj.save((err, savedReminderObj) => {
    if (err) return done(`Error while creating a new Reminder ${err}.`);
    return done(null, { response: savedReminderObj, message: "Reminder added sucessfully." });
  });
}

// Handler to delete reminder
function deleteReminder(userId, noteId, done) {
  logger.info("Inside DAO method - delete reminder");
  remindersModel.findOneAndRemove({
    userId: userId,
    noteId: noteId
  }, (err, deletedReminderObj) => {
    if (err) return done(`Error while deleting a particular Reminder ${err}.`);  
    return done(null, { response: deletedReminderObj, message: "Reminder deleted successfully." });
  });
}

// Handler to update reminder
function updateReminderDetails(userId, noteId, updateReminderObj, done) {
  logger.info("Inside DAO method - update reminder");
  let whereClause = {
    userId: userId,
    noteId: noteId
  };
  remindersModel.findOneAndUpdate(whereClause, updateReminderObj, {new: true},(err, modifiedReminderObj) => {    
    if (err) return done(`Error while updating a particular Reminder ${err}.`);
    return done(null, { response: modifiedReminderObj, message: "Reminder updated successfully." });
  });
}

// Handler to get reminder
function getReminder(userId, noteId, done) {
  logger.info("Inside DAO method - get reminder");
  remindersModel.findOne({
    userId: userId,
    noteId: noteId
  }, (err, reminderObj) => {
    if (err) return done(`Error while retrieving a Reminder by id ${err}.`);
    return done(null, reminderObj);
  });
}

// Handler to reminder by date
function getReminderByDate(currentDate, done) {  
  logger.info("Inside DAO method - get reminder by date");
  logger.info(currentDate);
  let whereQuery = `{ "$where": "function() { return ((obj.startDateTime >= ${currentDate} || (obj.startDateTime <= ${currentDate} && obj.endDateTime > ${currentDate})) || obj.nextReminder === null) }" }`;
  logger.info(whereQuery);
  remindersModel.find(JSON.parse(whereQuery), (err, reminderObj) => {
    if (err) return done(`Error while retrieving a Reminder by date ${err}.`);
    return done(null, reminderObj);
  });
}

// Handler to get next reminder by date
function getNextReminderByDate(currentDate, done) {
  logger.info("Inside DAO method - get next reminder by date");
  logger.info(currentDate);
  remindersModel.find({
    $or : [{
      nextReminder : new Date(currentDate)
    },
    {
      snoozeTime : new Date(currentDate)
    }]
  }, (err, reminderObj) => {
    if (err) return done(`Error while retrieving a Reminder by date ${err}.`);
    return done(null, reminderObj);
  });
}

// Handler to update reminder by id
function updateReminderById(reminderId, updateReminderObj, done) {
  logger.info("Inside DAO method - update reminder by id");
  let whereClause = {
    reminderId: reminderId
  };
  remindersModel.findOneAndUpdate(whereClause, updateReminderObj, {new: true},(err, modifiedReminderObj) => {    
    if (err) return done(`Error while updating a particular Reminder by Id ${err}.`);
    return done(null, { response: modifiedReminderObj, message: "Reminder updated successfully." });
  });
}

module.exports = {  
  createReminder,
  deleteReminder,
  updateReminderDetails,
  getReminder,
  getReminderByDate,
  getNextReminderByDate,
  updateReminderById
}