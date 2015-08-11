'use strict';

var express = require('express');
var supertest = require('supertest');
var logger = require('log4js').getLogger('Unit-Test');

var request = supertest(app);

exports['Check view health'] = function(test){

	request.get('/').end(function(err,res)){

  test.equal(err,null,'It should not had any error!');

	test.equal(res,200,'It should return 200!');

	test.done();

	}
}
