var fs   = require('fs'),
    path = require('path');
    
function initialize(server, logger) {
  
  server.get('/ping', function (req, res, next) {
    res.send({ status: 'ok', uptime: process.uptime(), requestsServerd: 0 });
    return next();
  });
  
};

//@TODO Change this to a dynamic loading of routes!!!!!!!!!
var routes = [
  'test'
];

//@TODO When solving the previous @TODO this will be similar but iterating the routes directory
module.exports = function(server, logger) {
  initialize(server, logger);
  
  routes.forEach(function (route) {
    try {
      require(path.join(__dirname, route))(server, logger);
    } catch (err) {
      throw new Error("Can't load '" + route + "' route");
    }
  });
};
