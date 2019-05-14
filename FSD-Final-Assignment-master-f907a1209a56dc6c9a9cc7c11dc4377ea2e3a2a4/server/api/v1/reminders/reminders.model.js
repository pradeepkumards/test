const mongoose = require('mongoose');

const FREQ_ARR = [ 'once', 'daily', 'weekly', 'monthly', 'yearly'];
const STATUS_ARR = [ '', 'DISMISS', 'SNOOZE' ];

const remindersSchema = new mongoose.Schema({  
  reminderId: {
    type: String,
    required: true
  },
  noteId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  startDateTime: {
    type: Date,
    required: true
  },
  endDateTime: {
    type: Date,
    required: true
  },
  frequency: {
    type: String,
    enum: FREQ_ARR,
    default: 'once',
    required: true
  },
  lastReminder: {
    type: Date,
    default: ''
  },
  nextReminder: {
    type: Date,
    default: ''
  },
  snoozeTime: {
    type: Date,
    default: ''
  },
  status: {
    type: String,
    enum: STATUS_ARR,
    default: ''
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  modifiedOn: {
    type: Date,
    default: Date.now
  }
}, { collection: 'reminders'});

remindersSchema.index({
  reminderId: 1, 
  noteId: 1,
  userId:1
},{
  unique:true
});

module.exports = mongoose.model('reminders', remindersSchema);