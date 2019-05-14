const express = require('express');
const morgan = require('morgan');

const swaggerUI = require('swagger-ui-express');

const YAML = require('yamljs');
const swaggerDocument = YAML.load('api/swagger/swagger.yaml');

const app = express();

morgan.token('time', (req, res) => new Date().toISOString());
app.use(
  morgan('[:time] :remote-addr :method :url :status :res[content-length] :response-time ms')
);

app.use(express.json());
app.use(express.urlencoded({extended: false}));



let swaggerOptions = { explorer: false };
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument, swaggerOptions));

module.exports = app;
