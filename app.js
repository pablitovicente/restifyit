'use strict';

const path = require('path');
const restify = require('restify');
const config  = require('config');
const routes  = require('./routes');
const os = require('os');


exports.createServer = createServer;


/*
 * Set up server
 * @return the created server
 */
function createServer (logger) {

  let settings = {
    name: (config.has('server.name') && config.get('server.name'))
            ? config.get('server.name')
            : require(path.join(__dirname, 'package')).name
  };

  if (logger) {
    settings.log = logger;
  }

  let server = restify.createServer(settings);

  server.use(restify.acceptParser(server.acceptable));
  server.use(restify.bodyParser({
    maxBodySize: 6000000,
    mapParams: true,
    mapFiles: false,
    overrideParams: false,
    keepExtensions: false,
    uploadDir: os.tmpdir(),
    multiples: true,
    hash: 'sha1'
  }));
  server.use(restify.queryParser());
  server.use(restify.CORS({
    origins: ['*'],   // Set your permited origins
    credentials: false                 // defaults to false
    // headers: ['x-foo'] any headers you might need
  }));
  server.use(restify.dateParser(5)); // Is this useful if not using some type of expiration tokens?
  server.use(restify.gzipResponse()); // Yes accept compressed content!
  server.use(restify.throttle({ // @TODO Something Redis based will work better probably
    burst: 100,
    rate: 50,
    ip: true,
    overrides: {
      '192.168.1.1': {
        rate: 0,        // unlimited
        burst: 0
      }
    }
  }));



  server.on('NotFound', function (req, res, next) {
    if (logger) {
      logger.debug('404', 'No route that matches request for ' + req.url);
    }
    res.send(404, req.url + ' was not found');
  });

  if (logger) {
    server.on('after', restify.auditLogger({log: logger}));
  }

  routes(server, logger);
  return server;
}
