/* global process:true */

'use strict';

var path = require('path'),
    config = require('config'),
    app = require('./app'),
    logging = require('./logging');

// if process.env.NODE_ENV has not been set, default to development
var NODE_ENV = process.env.NODE_ENV || 'development';

// Let's start by using a function so as this grow we can have a better contol
function run () {
  // Set up logging, logs go to /logs/* - see logging.js for more details
  var logger = logging.createLogger(config.get('logging'));
  var server = app.createServer(logger);

  // start listening
  var port = config.get('server.port');

  server.listen(port, function () {
    logger.info('%s listening at %s', server.name, server.url);
  });
}

run();
