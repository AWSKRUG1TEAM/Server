/****
 * External Dependency
 ****/
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const Sequelize = require('sequelize');
// var Promise = require('bluebird');

/****
 * Internal Dependency
 ****/
const config = require('./config.json');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/****
 * Sequelize Initialize
 ****/

import DbService from './service/dbService';
// const DbModel = require('./model/dbModel');

var dbService = new DbService({
  dbHost: 'localhst',
  dbPort: '5432',
  dbUsername: 'yuhogyun', // Todo: Need to set in ENV variale
  dbPassword: 'ghrbsdl114', // Todo: Need to set in ENV variale
  dbName: 'awskrug', // Todo: Need to set in ENV variale
  dbLogging: 'true'
});

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: (config.debug ? err : {})
  });
});

dbService.sync().then(() => {
  dbService.createExampleInsert();
});

module.exports = app;