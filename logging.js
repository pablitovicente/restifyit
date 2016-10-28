'use strict';

const fs = require('fs');
const path   = require('path');
const bunyan = require('bunyan');


exports.createLogger = createLogger;


/*
 * configure and start logging
 * @param {Object} settings The configuration object for defining dir: log
 * directory, level: loglevel
 * @return the created logger instance
 * @TODO check bunyan options for better optimization make the log level dependant on environment
 */
function createLogger (settings) {

  const pkg = require(path.join(__dirname, 'package'));
  const appName = pkg.name;
  const appVersion = pkg.version;
  const logDir = settings.dir || path.join(__dirname, 'logs');
  const logFile = path.join(logDir, appName + '-log.json');
  const logErrorFile = path.join(logDir, appName + '-errors.json');
  const logLevel = settings.level || 'debug';

  // Create log directory if it doesnt exist
  if (!fs.existsSync(logDir)){
    fs.mkdirSync(logDir);
  }

  // Log to console and log file
  let log = bunyan.createLogger({
    name: appName,
    streams: [
      {
        stream: process.stdout,
        level: process.env.NODE_ENV === 'production'?'warn': 'debug'
      },
      {
        path: logFile,
        level: logLevel,
        type: 'rotating-file',
        period: '1d'
      },
      {
        path: logErrorFile,
        level: 'error'
      }
    ],
    serializers: bunyan.stdSerializers
  });

  log.info('Starting ' + appName + ', version ' + appVersion);
  log.info('Environment set to ' + process.env.NODE_ENV);
  log.debug('Logging setup completed.');

  return log;
}
