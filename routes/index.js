const fs   = require('fs');
const path = require('path');
const _ = require('lodash');


//General routes

function initialize(server, logger) {
  server.get('/ping', function (req, res, next) {
    res.send({status: 'ok', uptime: process.uptime(), requestsServerd: 0});
    return next();
  });
}



//@TODO When solving the previous @TODO this will be similar but iterating the routes directory
module.exports = function(server, logger) {
  initialize(server, logger);


  fs.readdir(__dirname, (err, routes) => {
    _.remove(routes, (aRoute) => {
      return aRoute === 'index.js'? aRoute : false;
    }); // Omit index by now this might change as this evolves

    routes.forEach(function (route) {
      try {
        require(path.join(__dirname, route))(server, logger);
      } catch (err) {
        throw new Error('Can\'t load "' + route + '" route. Check the file: ' + __dirname + '/' + route);
      }
    });
  });


};
