const router = require('express').Router();
const usersCtrl = require('../users/users.controller');
const notesCtrl = require('./notes.controller');
const logger = require('../../../logger');

router.use(usersCtrl.isAuthenticated);

// Handler to add new note
router.post('/', function(req, res) {
  logger.info("Inside router method - add new note");
  try {
    let userId = req.user.userInfo.userId;
    let noteObj = req.body;
    notesCtrl.addNote(userId, noteObj, (err, result) => {
      if (err) {
        logger.error(`Error in routing to post method for adding note ${err}`);
        return res.status(500).send({ error: err });
      }      
      return res.send(result);
    })
  } catch (err) {
    logger.error(`Error in catch block of routing to post method for adding note ${err}`);
    return res.status(500).send({ error: `Something went wrong, please try later..! ${err}` });
  }
});

// Handler to delete existing note
router.delete('/:noteId', function(req, res) {
  logger.info("Inside router method - delete existing note");
  try {
    let userId = req.user.userInfo.userId;
    let noteId = req.params.noteId;
    notesCtrl.deleteNote(userId, noteId, (err, result) => {
      if (err) {
        logger.error(`Error in routing to delete method for deleting note ${err}`);
        return res.status(500).send({ error: err });
      }      
      return res.send(result);
    })
  } catch (err) {
    logger.error(`Error in catch block of routing to delete method for deleting note ${err}`);
    return res.status(500).send({ error: `Something went wrong, please try later..! ${err}` });
  }
});

// Handler to update existing note
router.put('/:noteId', function(req, res) {
  logger.info("Inside router method - update existing note");
  try {
    let userId = req.user.userInfo.userId;
    let noteId = req.params.noteId;
    let noteObj = req.body;
    notesCtrl.updateNote(userId, noteId, noteObj, (err, result) => {
      if (err) {
        logger.error(`Error in routing to put method for updating note ${err}`);
        return res.status(500).send({ error: err });
      }      
      return res.send(result);
    })
  } catch (err) {
    logger.error(`Error in catch block of routing to put method for updating note ${err}`);
    return res.status(500).send({ error: `Something went wrong, please try later..! ${err}` });
  }
});

// Handler to get note by noteId
router.get('/:noteId', function(req, res) {
  logger.info("Inside router method - get note by noteId");
  try {
    let userId = req.user.userInfo.userId;
    let noteId = req.params.noteId;
    notesCtrl.getNoteByNoteId(userId, noteId, (err, result) => {
      if (err) {
        logger.error(`Error in routing to get method for get note by noteId ${err}`);
        return res.status(500).send({ error: err });
      }      
      return res.send(result);
    })
  } catch (err) {
    logger.error(`Error in catch block of routing to get method for get note by noteId ${err}`);
    return res.status(500).send({ error: `Something went wrong, please try later..! ${err}` });
  }
});

// Handler to add note to favorites
router.post('/favourite/:noteId', function(req, res) {
  logger.info("Inside router method - add note to favorite");
  try {
    let userId = req.user.userInfo.userId;
    let noteId = req.params.noteId;
    notesCtrl.addNoteToFavorites(userId, noteId, (err, result) => {
      if (err) {
        logger.error(`Error in routing to get favorite notes ${err}`);
        return res.status(500).send({ error: err });
      }      
      return res.send(result);
    })
  } catch (err) {
    logger.error(`Error in catch block of routing to get favorite notes ${err}`);
    return res.status(500).send({ error: `Something went wrong, please try later..! ${err}` });
  }
});

// Handler to search notes
router.get('/', function(req, res) {
  logger.info("Inside router method - search notes");
  try {
    let userId = req.user.userInfo.userId;
    let searchParams = req.query;
    notesCtrl.searchNotes(userId, searchParams, (err, result) => {
      if (err) {
        logger.error(`Error in routing to search notes ${err}`);
        return res.status(500).send({ error: err });
      }      
      return res.send(result);
    })
  } catch (err) {
    logger.error(`Error in catch block of routing to search notes ${err}`);
    return res.status(500).send({ error: `Something went wrong, please try later..! ${err}` });
  }
});

// Handler to share notes to user
router.post('/share/:noteId/:emailId/:accessType', function(req, res) {
  logger.info("Inside router method - share notes");
  try {
    let userId = req.user.userInfo.userId;
    let noteId = req.params.noteId;
    let emailId = req.params.emailId;
    let accessType = req.params.accessType;
    notesCtrl.shareUserToNote(userId, noteId, emailId, accessType, (err, result) => {
      if (err) {
        logger.error(`Error in routing to share note ${err}`);
        return res.status(500).send({ error: err });
      }      
      return res.send(result);
    })
  } catch (err) {
    logger.error(`Error in catch block of routing to share note ${err}`);
    return res.status(500).send({ error: `Something went wrong, please try later..! ${err}` });
  }
});

module.exports = router;