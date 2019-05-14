const bcrypt = require('bcrypt-nodejs');
const requiredFields = ['name', 'emailId', 'password'];

// Validation method for input data
function validateInputs(data) {
  let inputIndex = 0;
  for (let key in data) {
    if (data[key]) 
      inputIndex++;
  }
  if (inputIndex === 0) {
    return "empty";
  } else {
    return (inputIndex === requiredFields.length) ? "valid" : "empty";
  }
}

// Comapre password
function verifyPassword(inputPassword, dbPassword) {
  return bcrypt.compareSync(inputPassword, dbPassword);
}

module.exports = {
  validateInputs,
  verifyPassword
}