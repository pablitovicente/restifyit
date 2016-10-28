'use strict';

const should  = require('chai').should();
const request = require('supertest');


describe('/ping', function () {

  it('should return an object including status and uptime', function (done) {
    request(baseURL)
      .get('/ping')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        } else {
          res.body.should.be.an('object');
          res.body.should.have.ownProperty('status');
          res.body.should.have.ownProperty('uptime');
          res.body.status.should.exist;
          res.body.status.should.match(/ok/);
          res.body.uptime.should.exist;
          return done();
        }
      });
  });

});
