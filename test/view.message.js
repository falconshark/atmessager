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

app.get('/message',message.healthCheck);
app.post('/message',message.sendMessage);

exports['Check view health'] = function(test){

	request.get('/message').end(function(err,res){

  logger.debug('The http status of message view: ' + res.statusCode );

  test.equal(err,null,'It should not had any error!');

	test.equal(res.statusCode,200,'It should return 200!');

	test.done();
});
}

exports['Test send message'] = {

	'Test send message success':function(test){

		var receiver = nconf.get('message').receiver;
		var botname  = nconf.get('message').botname;
		var sender = nconf.get('message').sender;
		var password = nconf.get('message').password;

		request.post('/message')
		.send({'receiver':receiver,
		'botname':botname,
		'sender':sender,
		'message':'Hello World!',
		'password':password})
		.end(function(err,res){

			logger.debug('The http status of message view: ' + res.statusCode );

		  test.equal(err,null,'It should not had any error!')

			test.equal(res.statusCode,201,'It should return 201!');

			test.done();

		});
	},

	'Test send message failed(wrong receiver name)':function(test){

		var receiver = nconf.get('message').receiver;
		var botname  = nconf.get('message').botname;
		var sender = nconf.get('message').sender;
		var password = nconf.get('message').password;

		request.post('/message')
		.send({'receiver':'Hello Man',
		'botname':botname,
		'message':'Hello World!',
		'sender':sender,
		'password':password})
		.end(function(err,res){

			logger.debug('The http status of message view: ' + res.statusCode );

			test.equal(res.statusCode,400,'It should return 400!');

			test.done();

		});
	},

	'Test send message failed(wrong bot name)':function(test){

		var receiver = nconf.get('message').receiver;
		var botname  = nconf.get('message').botname;
		var sender = nconf.get('message').sender;
		var password = nconf.get('message').password;

		request.post('/message')
		.send({'receiver':receiver,
		'botname':'noBot',
		'message':'Hello World!',
		'sender':sender,
		'password':password})
		.end(function(err,res){

			logger.debug('The http status of message view: ' + res.statusCode );

			test.equal(res.statusCode,401,'It should return 401!');

			test.done();

		});
	},

	'Test send message failed(wrong sender)':function(test){

		var receiver = nconf.get('message').receiver;
		var botname  = nconf.get('message').botname;
		var sender = nconf.get('message').sender;
		var password = nconf.get('message').password;

		request.post('/message')
		.send({'receiver':receiver,
		'botname':botname,
		'message':'Hello World!',
		'sender':'nobody',
		'password':password})
		.end(function(err,res){

			logger.debug('The http status of message view: ' + res.statusCode );

			test.equal(res.statusCode,406,'It should return 406!');

			test.done();

		});
	},

	'Test send message failed(password mismatch)':function(test){

		var receiver = nconf.get('message').receiver;
		var botname  = nconf.get('message').botname;
		var sender = nconf.get('message').sender;
		var password = nconf.get('message').password;

		request.post('/message')
		.send({'receiver':receiver,
		'botname':botname,
		'message':'Hello World!',
		'password':''})
		.end(function(err,res){

			logger.debug('The http status of message view: ' + res.statusCode );

			test.equal(res.statusCode,402,'It should return 402!');

			test.done();

		});
	},

	'Test send message failed(miss message)':function(test){

		var receiver = nconf.get('message').receiver;
		var botname  = nconf.get('message').botname;
		var sender = nconf.get('message').sender;
		var password = nconf.get('message').password;

		request.post('/message')
		.send({'receiver':receiver,
		'botname':botname,
		'sender':sender,
		'password':password})
		.end(function(err,res){

			logger.debug('The http status of message view: ' + res.statusCode );

			test.equal(res.statusCode,403,'It should return 403!');

			test.done();

		});
	}
}
