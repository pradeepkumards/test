const express = require('express');
const morgan = require('morgan');
const logger = require('./logger');

const swaggerUI = require('swagger-ui-express');

const YAML = require('yamljs');
const swaggerDocument = YAML.load('./api/swagger/swagger.yaml');

const app = express();

morgan.token('time', (req, res) => new Date().toISOString());
app.use(
  morgan('[:time] :remote-addr :method :url :status :res[content-length] :response-time ms')
);

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const dbConn = require('./dbConnection')();

app.use('/api/v1', require('./api/v1'));

app.use((err, req, res, next) => {
  if(err) { logger.error(err); next(); }
  res.status(404).send('Not Found');
});

let swaggerOptions = { explorer: false };
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument, swaggerOptions));

module.exports = app;