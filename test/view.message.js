'use strict';

var express = require('express');
var supertest = require('supertest');
var logger = require('log4js').getLogger('Unit-Test');
var testUtil = require('./common/testutil.js');
var message = require('../atmessager/views/message.js');

var nconf = require('nconf');
nconf.argv()
		 .env()
		 .file({ file: 'config.json' });

var app = testUtil.configExpress(express());

var request = supertest(app);

app.get('/message',message.sendMessage);

var receiver = nconf.get('message').receiver;

exports['Check view health'] = function(test){

	request.get('/message').end(function(err,res){

  test.equal(err,null,'It should not had any error!');

	test.equal(res.statusCode,200,'It should return 200!');

	test.done();
});
}

exports['Test send message'] = {

	'Test send message success':function(test){

		request.post('/message')
		.send({'receiver':'','text':'Hello World!'})
		.end(function(err,res){

		  test.equal(err,null,'It should not had any error!')

			test.equal(res.statusCode,201,'It should return 201!');

			test.done();

		});
	}
}
