const async = require('async');
const remindersService = require('./reminders.service');
const logger = require('../../../logger');
const moment = require('moment');
const dateFormat = 'YYYY-MM-DD HH:mm:ss';

// Handler to add reminder
function addReminder(userId, newReminderObj, done) {
  logger.info("Inside controller method - add reminder");
  remindersService.addReminder(userId, newReminderObj, done);
}

// Handler to delete reminder
function deleteReminder(userId, noteId, done) {
  logger.info("Inside controller method - delete reminder");
  remindersService.deleteReminder(userId, noteId, done);
}

// Handler to update reminder
function updateReminder(userId, noteId, updateReminderObj, done) {
  logger.info("Inside controller method - update reminder");
  remindersService.updateReminder(userId, noteId, updateReminderObj, done);
}

// Handler to get reminder
function getReminder(userId, noteId, done) {
  logger.info("Inside controller method - get reminder");
  remindersService.getReminder(userId, noteId, done);
}

// Handler to reminder by date
function getReminderByDate(done) {
  logger.info("Inside controller method - get reminder by date");
  let currentDate = moment().format(dateFormat);
  async.waterfall([
      (cb => remindersService.getReminderByDate(cb)),
      ((remindersObj, cb) => {
        if (remindersObj) {
          let remindersLen = remindersObj.length;
		  logger.info(remindersLen);
          for (let i = 0; i < remindersLen; i++) {
            let durationObj = {};
            let nextReminderDate;
            let snoozeDateTime;   
			logger.info(remindersObj[i].frequency);			
            if (remindersObj[i].lastReminder === null) {
              nextReminderDate = moment(remindersObj[i].startDateTime).format(dateFormat);
            } else {
              switch (remindersObj[i].frequency) {
                case 'daily':
                  durationObj = {'size': 1, 'format': 'd'};
                  break;
                case 'weekly':
                  durationObj = {'size': 7, 'format': 'd'};
                  break;
                case 'monthly':
                  durationObj = {'size': 1, 'format': 'M'};
                  break;
                case 'yearly':
                  durationObj = {'size': 1, 'format': 'y'};
                  break;
                case 'once':
                default:
                  durationObj = {'size': 0, 'format': 'd'};
                  break;
              }
			  logger.info(durationObj);
              nextReminderDate = moment(remindersObj[i].lastReminder).add(durationObj.size, durationObj.format).format(dateFormat);
            }
            snoozeDateTime = moment(nextReminderDate).subtract(15, 'm').format(dateFormat);
            let updateReminderObj = {
              'nextReminder': nextReminderDate,
              'snoozeTime': snoozeDateTime
            }
			remindersService.updateReminder(remindersObj[i].userId, remindersObj[i].noteId, updateReminderObj, cb);
          }
        }
      })
    ], (err, result) => {
      return done(err, result);
  });
}

// Handler to get next reminder by date
function getNextReminderByDate(done) {
  logger.info("Inside controller method - get next reminder by date");
  async.waterfall([
      (cb => remindersService.getNextReminderByDate(cb)),
      ((remindersObj, cb) => {        
        if (remindersObj) {
          let remindersLen = remindersObj.length;
		  logger.info(remindersLen);
          for (let i = 0; i < remindersLen; i++) {
            let snoozeDateTime;
            let updateReminderObj = {};
            let processed = 0;
            if (moment().format(dateFormat) === moment(remindersObj[i].nextReminder).format(dateFormat)) {
              updateReminderObj = {
                'lastReminder': remindersObj[i].nextReminder,
                'snoozeTime' : null
              };
              if (remindersObj[i].frequency !== 'once') {
                updateReminderObj.nextReminder = null;
              }              
              remindersService.updateReminder(remindersObj[i].userId, remindersObj[i].noteId, updateReminderObj, cb);
              processed = 1;
              logger.info("Trigger Actual Reminder");
            }
            if (processed === 0 && remindersObj[i].status !== "DISMISS"
              && moment().format(dateFormat) === moment(remindersObj[i].snoozeTime).format(dateFormat)) {
              snoozeDateTime = moment(remindersObj[i].snoozeTime).add(5, 'm').format(dateFormat);
              updateReminderObj = {
                'snoozeTime': snoozeDateTime
              }
              remindersService.updateReminder(remindersObj[i].userId, remindersObj[i].noteId, updateReminderObj, cb);
              logger.info("Trigger Snooze Reminder");
            }
          }
        }
      })
    ], (err, result) => {
      return done(err, result);
  });
}

// Handler to update reminder by id
function updateReminderById(reminderId, reminderStatus, done) {
  logger.info("Inside controller method - update reminder by id");
  let updateReminderObj = {
    'status': reminderStatus
  }  
  remindersService.updateReminderById(reminderId, updateReminderObj, done);
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