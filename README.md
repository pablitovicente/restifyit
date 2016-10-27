## Restify Boiler Plate

The objective of this project is to get you started with http://restify.com/ 
(Started from https://github.com/vsimonian/generator-restify-server but the idea is to 
use newest versions of the modules and move all the code to ECMA6)

### What's Included (this might change as the project evolves)

- [config](https://github.com/lorenwest/node-config) for configuration
- [bunyan](https://github.com/trentm/node-bunyan) for logging
- [mocha](http://visionmedia.github.io/mocha/) and [supertest](
  https://github.com/visionmedia/supertest) for testing
- [cluster](http://nodejs.org/docs/latest/api/cluster.html) for managing workers

### Configuring
See `config/local.json5.example` for a sample to get you started. If you need to
change any defaults, make a copy named `local.json5` and change it to your
liking.

If you want to have different configuration properties for different
environments, create configuration files named after the environments they are
for. For example, to create a configuration file that will be used when
`NODE_ENV` is `development`, create `development.json5`.

### Starting and stopping

Running `npm start` will start the server using

### Testing

Running `npm test` will execute the tests in the `test` directory using mocha.

### @TODO (in the near future)
- Add any useful Restisy plugins for a real world application.
- Add dynamic loading of routes instead of using a configuration array.
- Integrate PassportJS (at least local and jwt).
- Integrate mongoose.
- Use gulp or grunt for having some development goodies like file watching and linters.
- Use ECMA6 as much as possible. 


 
### @TODO (in the not so near future)
- Provide sample pm2 scripts and configurations (including service instalation in linux).
- Provide sample Nginx configurations.
- Add some ACL module.
- Add some caching module.
- Integrate sequelizejs.
- Integrate Socket.io, some authentication example with it plus a simple example protocol. 