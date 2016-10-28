'use strict';

const config       = require('config');
const app          = require('../app');
const bunyan       = require('bunyan');
const PrettyStream = require('bunyan-prettystream');
const request      = require('supertest');

let server;

before(function (done) {

  const bunyanToConsole = new PrettyStream();
  bunyanToConsole.pipe(process.stdout);

  const logger = bunyan.createLogger({
    name: 'testLogger',
    streams: [{
      level: 'error',
      type: 'raw',
      stream: bunyanToConsole
    }]
  });

  server = app.createServer(logger);

  // start listening
  const port = config.get('server.port');
  server.listen(port, function () {
    logger.info('%s listening at %s', server.name, server.url);
  });

  global.baseURL = 'http://localhost:' + port;

  // make sure the server is started
  setTimeout(function() {
    request(baseURL)
        .get('/')
        .end(function (err, res) {
          if (err && err.code === 'ECONNREFUSED') {
            return done(new Error('Server is not running.'));
          }
          return done(err);
        });
  }, 500);
});

after(function () {
  server.close();
});
