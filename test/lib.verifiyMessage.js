'use strict';

var logger = require('log4js').getLogger('Unit-Test');
var vaildMessage = require(__dirname + '/../atmessager/lib/vaildMessage').vaildMessage;

var nconf = require('nconf');
nconf.file('bots', __dirname + '/config/bots.json')
	.file('receviers', __dirname + '/config/receivers.json')
	.file('testconfig', __dirname + '/config/testconfig.json');

exports['Test vaild message'] = {

	'Test receiver vaild failed': function(test) {

		var receiver = 'No this receiver';
		var message = 'Hello World!';
		var botname = nconf.get('message').botname;
		var sender = nconf.get('message').sender;
		var password = nconf.get('message').password;

		var vaildResult = vaildMessage(receiver,message,botname,sender,password);

		logger.debug('ErrorCode: '+ vaildResult['error']);

		test.equal(vaildResult['error'],333,'The error code should be 333! ');

		test.done();

	},

	'Test missing message': function(test) {

		var receiver = nconf.get('message').receiver;
		var message = null;
		var botname = nconf.get('message').botname;
		var sender = nconf.get('message').sender;
		var password = nconf.get('message').password;

		var vaildResult = vaildMessage(receiver,message,botname,sender,password);

		logger.debug('ErrorCode: '+ vaildResult['error']);

		test.equal(vaildResult['error'],369,'The error code should be 369! ');

		test.done();

	},

	'Test botname vaild failed': function(test) {

		var receiver = nconf.get('message').receiver;
		var message = 'Hello World!';
		var botname = 'No this bot';
		var sender = nconf.get('message').sender;
		var password = nconf.get('message').password;

		var vaildResult = vaildMessage(receiver,message,botname,sender,password);

		logger.debug('ErrorCode: '+ vaildResult['error']);

		test.equal(vaildResult['error'],360,'The error code should be 360! ');

		test.done();

	},

	'Test sender vaild failed': function(test) {

		var receiver = nconf.get('message').receiver;
		var botname = nconf.get('message').botname;
		var message = 'Hello World!';
		var sender = 'No this sender';
		var password = nconf.get('message').password;

		var vaildResult = vaildMessage(receiver,message,botname,sender,password);

		logger.debug('ErrorCode: '+ vaildResult['error']);

		test.equal(vaildResult['error'],380,'The error code should be 380! ');

		test.done();

	},

	'Test password vaild failed': function(test) {

		var receiver = nconf.get('message').receiver;
		var message = 'Hello World!';
		var botname = nconf.get('message').botname;
		var sender = nconf.get('message').sender;
		var password = 'not this password';

		var vaildResult = vaildMessage(receiver,message,botname,sender,password);

		logger.debug('ErrorCode: '+ vaildResult['error']);

		test.equal(vaildResult['error'],361,'The error code should be 361! ');

		test.done();

	},

	'Test all vaild success': function(test) {

		var receiver = nconf.get('message').receiver;
		var message = 'Hello World!';
		var botname = nconf.get('message').botname;
		var sender = nconf.get('message').sender;
		var password = nconf.get('message').password;

		var vaildResult = vaildMessage(receiver,message,botname,sender,password);

		logger.debug('ErrorCode: '+ vaildResult['error']);

		test.equal(vaildResult['error'],null,'The error should be null! ');

		test.done();

	}
}
