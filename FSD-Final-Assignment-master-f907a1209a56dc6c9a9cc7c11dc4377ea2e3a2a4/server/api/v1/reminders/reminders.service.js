const remindersDao = require('./reminders.dao');
const uuidv4 = require('uuid/v4');
const moment = require('moment');
const dateFormat = 'YYYY-MM-DD';
const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';
const logger = require('../../../logger');

// Handler to add reminder
function addReminder(userId, newReminderObj, done) {
  logger.info("Inside service method - add reminder");
  newReminderObj.reminderId = uuidv4();
  remindersDao.createReminder(userId, newReminderObj, done);
}

// Handler to delete reminder
function deleteReminder(userId, noteId, done) {
  logger.info("Inside service method - delete reminder");
  remindersDao.deleteReminder(userId, noteId, done);
}

// Handler to update reminder
function updateReminder(userId, noteId, updateReminderObj, done) {
  logger.info("Inside service method - update reminder");
  remindersDao.updateReminderDetails(userId, noteId, updateReminderObj, done);
}

// Handler to get reminder
function getReminder(userId, noteId, done) {
  logger.info("Inside service method - get reminder");
  remindersDao.getReminder(userId, noteId, done);
}

// Handler to reminder by date
function getReminderByDate(done) {
  logger.info("Inside service method - get reminder by date");
  let currentDate = moment().format(dateFormat);
  remindersDao.getReminderByDate(currentDate, done);
}

// Handler to get next reminder by date
function getNextReminderByDate(done) {
  logger.info("Inside service method - get next reminder by date");
  let currentDate = moment().format(dateTimeFormat);
  remindersDao.getNextReminderByDate(currentDate, done);
}

// Handler to update reminder by id
function updateReminderById(reminderId, updateReminderObj, done) {
  logger.info("Inside service method - update reminder by id");
  remindersDao.updateReminderById(reminderId, updateReminderObj, done);
}

module.exports = {
  addReminder,
  deleteReminder,
  updateReminder,
  getReminder,
  getReminderByDate,
  getNextReminderByDate,
  updateReminderById
}