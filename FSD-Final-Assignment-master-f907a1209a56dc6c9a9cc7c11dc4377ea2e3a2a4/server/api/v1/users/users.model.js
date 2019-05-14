const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const usersSchema = new mongoose.Schema({  
  userId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  emailId: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  },
  sharedNotes: {
    type: [String]
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  modifiedOn: {
    type: Date,
    default: Date.now
  }
}, { collection: 'users'});

usersSchema.pre('save', function(next) {
  let user = this;
  if (this.isModified("password") || this.isNew) {
    let hashPassword = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    user.password = hashPassword;
  }
  next();  
});

module.exports = mongoose.model('users', usersSchema);