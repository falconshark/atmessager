'use strict';

var express = require('express');
var supertest = require('supertest');
var logger = require('log4js').getLogger('Unit-Test');
var nconf = require('nconf');
nconf.argv()
		 .env()
		 .file({ file: 'config.json' });

var request = supertest(app);

exports['Check view health'] = function(test){

	request.get('/message').end(function(err,res)){

  test.equal(err,null,'It should not had any error!');

	test.equal(res,200,'It should return 200!');

	test.done();

	}
}

exports['Test send message'] = {

	'Test send message success':function(test){

		request.post('/message'),
		.send({'receiver':'','text':'Hello World'!})
		.end(function(err,res)){

		  test.equal(err,null,'It should not had any error!')

			test.equal(res,201,'It should return 201!');

		}
	}
}
