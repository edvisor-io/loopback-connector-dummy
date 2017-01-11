'use strict';

const _ = require('lodash');
const Promise = require('bluebird');
const debug = require('debug')('loopback:connector:dummy');

var Dummy = function() {};

Dummy.send = function(message, options, cb) {
  if (_.isFunction(options) && cb === undefined) {
    cb = options;
    options = undefined;
  }

  debug('Calling `send` with message: %s', message);
  debug('Calling `send` with settings: %O', options);

  if (_.isFunction(cb)) {
    cb();
  } else {
    return Promise.resolve();
  }
};

Dummy.prototype.send = function(options, cb) {
  return this.constructor.send(this, options, cb);
};

function DummyConnector(settings) {
  debug('Initialize SQS connector with settings: %O', settings);
}

DummyConnector.initialize = function(dataSource, cb) {
  dataSource.connector = new DummyConnector(dataSource.settings);

  if (_.isFunction(cb)) {
    cb();
  }
};

DummyConnector.prototype.DataAccessObject = Dummy;

module.exports = DummyConnector;
