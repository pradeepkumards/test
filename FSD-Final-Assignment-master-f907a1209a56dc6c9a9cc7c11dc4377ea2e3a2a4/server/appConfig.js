let config = {
  EMAIL_CONFIGURATION: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
	  user: 'notes.application.fsd@gmail.com',
	  pass: 'note$1234'
    }
  },
  NO_REPLY: 'notes.application.fsd@gmail.com',
  MONGO: {
    MONGO_URL: (process.env.MONGO_URL || 'mongodb://notesapp_mongodb:27017/testDB')
  },
  JWT_SECRET_KEY: 'cognizant',
  WWW_PORT: (process.env.PORT || 3000)
}

module.exports = config;
