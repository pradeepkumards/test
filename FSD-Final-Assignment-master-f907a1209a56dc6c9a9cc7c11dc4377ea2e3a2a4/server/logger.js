const log4js = require('log4js');
const loggerConfig = {
  appenders: {
    console: {
      type: 'console'
    },
    appLogs: {
      type: 'file',
      filename: 'server/logs/notes_app_v1.log'
    }
  },
  categories: {
    default: { appenders: ['console', 'appLogs'], level: 'trace' }
  }
}

log4js.configure(loggerConfig);
const logger = log4js.getLogger('default');
module.exports = logger;