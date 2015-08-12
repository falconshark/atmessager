'use strict';

var express = require('express');
var supertest = require('supertest');
var logger = require('log4js').getLogger('Unit-Test');
var testUtil = require('./common/testutil.js');
var health = require('../atmessager/views/health.js')

var app = testUtil.configExpress(express());

app.get('/',health.healthCheck);

var request = supertest(app);

exports['Check health view'] = function(test){

	request.get('/').end(function(err,res){

  test.equal(err,null,'It should not had any error!');

	test.equal(res.statusCode,200,'It should return 200!');

	test.done();
});
}
