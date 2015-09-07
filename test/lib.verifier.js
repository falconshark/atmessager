'use strict';

var logger = require('log4js').getLogger('Unit-Test');
var verifiyMessage = require(__dirname + '/../atmessager/lib/verifier').verifiyMessage;

var nconf = require('nconf');
nconf.file('bots', __dirname + '/config/bots.json')
	.file('senders',__dirname + '/config/senders.json')
	.file('receivers', __dirname + '/config/receivers.json')
	.file('testconfig', __dirname + '/config/testconfig.json');

var config = {
	receivers: nconf.get('receivers'),
	bots: nconf.get('bots'),
	senders:nconf.get('senders')
};

exports['Test vaild message'] = {

	'Test receiver vaild failed': function(test) {

		var receiver = 'No this receiver';
		var message = 'Hello World!';
		var botname = nconf.get('message').botname;
		var sender = nconf.get('message').sender;
		var password = nconf.get('message').password;

		var verifiyResult = verifiyMessage(config, receiver, message, botname, sender, password);

		logger.debug('verifiy result: ' + verifiyResult);

		test.equal(verifiyResult, 'Bad Request: Wrong receiver name', 'The error message not match! ');

		test.done();

	},

	'Test missing message': function(test) {

		var receiver = nconf.get('message').receiver;
		var message = null;
		var botname = nconf.get('message').botname;
		var sender = nconf.get('message').sender;
		var password = nconf.get('message').password;

		var verifiyResult = verifiyMessage(config, receiver, message, botname, sender, password);

		logger.debug('verifiy result: ' + verifiyResult);

		test.equal(verifiyResult, 'Bad Request: Missing message', 'The error message not match! ');

		test.done();

	},

	'Test botname vaild failed': function(test) {

		var receiver = nconf.get('message').receiver;
		var message = 'Hello World!';
		var botname = 'No this bot';
		var sender = nconf.get('message').sender;
		var password = nconf.get('message').password;

		var verifiyResult = verifiyMessage(config, receiver, message, botname, sender, password);

		logger.debug('verifiy result: ' + verifiyResult);

		test.equal(verifiyResult, 'Bad Request: Wrong bot name', 'The error code should be 360! ');

		test.done();

	},

	'Test sender vaild failed': function(test) {

		var receiver = nconf.get('message').receiver;
		var botname = nconf.get('message').botname;
		var message = 'Hello World!';
		var sender = 'No this sender';
		var password = nconf.get('message').password;

		var verifiyResult = verifiyMessage(config, receiver, message, botname, sender, password);

		logger.debug('verifiy result: ' + verifiyResult);

		test.equal(verifiyResult, 'Bad Request: Sender not found', 'The error message not match! ');

		test.done();

	},

	'Test password vaild failed': function(test) {

		var receiver = nconf.get('message').receiver;
		var message = 'Hello World!';
		var botname = nconf.get('message').botname;
		var sender = nconf.get('message').sender;
		var password = 'not this password';

		var verifiyResult = verifiyMessage(config, receiver, message, botname, sender, password);

		logger.debug('verifiy result: ' + verifiyResult);

		test.equal(verifiyResult, 'Bad Request: Password not match', 'The error message not match! ');

		test.done();

	},

	'Test all vaild success': function(test) {

		var receiver = nconf.get('message').receiver;
		var message = 'Hello World!';
		var botname = nconf.get('message').botname;
		var sender = nconf.get('message').sender;
		var password = nconf.get('message').password;

		var verifiyResult = verifiyMessage(config, receiver, message, botname, sender, password);

		logger.debug('verifiy result: ' + verifiyResult);

		test.equal(verifiyResult, 'Message verified', 'The Message should be verified!');

		test.done();

	}
}
