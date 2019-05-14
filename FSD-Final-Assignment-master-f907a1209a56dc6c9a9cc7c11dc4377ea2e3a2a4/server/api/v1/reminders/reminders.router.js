const router = require('express').Router();
const usersCtrl = require('../users/users.controller');
const remindersCtrl = require('./reminders.controller');
const logger = require('../../../logger');

router.use(usersCtrl.isAuthenticated);

// Handler to add reminder to note
router.post('/:noteId', function(req, res) {
  logger.info("Inside router method - Add reminder to note");
  try {      
    let userId = req.user.userInfo.userId;
    let newReminderObj = req.body;
	newReminderObj.noteId = req.params.noteId;
    remindersCtrl.addReminder(userId, newReminderObj, (err, result) => {
      if (err) {
        logger.error(`Error in routing to add reminder ${err}`);
        return res.status(500).send({ error: err });
      }
      return res.send(result);
    })
  } catch (err) {
    logger.error(`Error in catch block of routing to add reminder ${err}`);
    return res.status(500).send({ error: `Something went wrong, please try later..! ${err}` });
  }
});

// Handler to delete reminder from note
router.delete('/:noteId', function(req, res) {
  logger.info("Inside router method - Delete reminder from note");
  try {      
    let userId = req.user.userInfo.userId;
    let noteId = req.params.noteId;
    remindersCtrl.deleteReminder(userId, noteId, (err, result) => {
      if (err) {
        logger.error(`Error in routing to delete reminder ${err}`);
        return res.status(500).send({ error: err });
      }
      return res.send(result);
    })
  } catch (err) {
    logger.error(`Error in catch block of routing to delete reminder ${err}`);
    return res.status(500).send({ error: `Something went wrong, please try later..! ${err}` });
  }
});

// Handler to update reminder
router.put('/:noteId', function(req, res) {
  logger.info("Inside router method - Update reminder");
  try {      
    let userId = req.user.userInfo.userId;
    let noteId = req.params.noteId;
	let updatedReminerObj = req.body;
    remindersCtrl.updateReminder(userId, noteId, updatedReminerObj, (err, result) => {
      if (err) {
        logger.error(`Error in routing to update reminder ${err}`);
        return res.status(500).send({ error: err });
      }
      return res.send(result);
    })
  } catch (err) {
    logger.error(`Error in catch block of routing to update reminder ${err}`);
    return res.status(500).send({ error: `Something went wrong, please try later..! ${err}` });
  }
});

// Handler to get note reminder
router.get('/:noteId', function(req, res) {
  logger.info("Inside router method - get reminder");
  try {      
    let userId = req.user.userInfo.userId;
    let noteId = req.params.noteId;
    remindersCtrl.getReminder(userId, noteId, (err, result) => {
      if (err) {
        logger.error(`Error in routing to get reminder ${err}`);
        return res.status(500).send({ error: err });
      }
      return res.send(result);
    })
  } catch (err) {
    logger.error(`Error in catch block of routing to get reminder ${err}`);
    return res.status(500).send({ error: `Something went wrong, please try later..! ${err}` });
  }
});

// Handler to update reminder status (DISMISS or SNOOZE)
router.get('/:reminderId/:reminderStatus', function(req, res) {
  logger.info("Inside router method - DISMISS OR SNOOZE reminder");
  try {      
    let reminderId = req.params.reminderId;
    let reminderStatus = req.params.reminderStatus;
    remindersCtrl.updateReminderById(reminderId, reminderStatus, (err, result) => {
      if (err) {
        logger.error(`Error in routing to DISMISS or SNOOZE reminder ${err}`);
        return res.status(500).send({ error: err });
      }
      return res.send(result);
    })
  } catch (err) {
    logger.error(`Error in catch block of routing to DISMISS or SNOOZE reminder ${err}`);
    return res.status(500).send({ error: `Something went wrong, please try later..! ${err}` });
  }
});

module.exports = router;