'use strict';

var logger = require('log4js').getLogger('Unit-Test');
var telegram = require(__dirname + '/../atmessager/lib/telegram');

var nconf = require('nconf');
nconf.file('bots', __dirname + '/config/bots.json')
	.file('receviers', __dirname + '/config/receivers.json')
	.file('testconfig', __dirname + '/config/testconfig.json');

exports['Test send message'] = {

	'Test receiver not found': function(test) {

		var receiver = 'No this receiver';
		var message = 'Hello World!';
		var botname = nconf.get('message').botname;
		var password = nconf.get('message').password;

		telegram.sendMessage(receiver, message, botname,
			function(err, result) {

				logger.debug('Error: ', err);
				logger.debug('Message:' , result);

				test.ok(err !== null, 'It should return error! ');

				test.done();
			});
	},

	'Test bot not found': function(test) {

		var receiver = nconf.get('message').receiver;
		var message = 'Hello World!';
		var botname = 'No this bot!';
		var password = nconf.get('message').password;

		telegram.sendMessage(receiver, message, botname,
			function(err, result) {

				logger.debug('Error: ', err);
				logger.debug('Message:' , result);

				test.ok(err !== null, 'It should return error! ');

				test.done();
			});
	},

	'Test send message success': function(test) {

		var receiver = nconf.get('message').receiver;
		var message = 'Hello World!';
		var botname = nconf.get('message').botname;
		var password = nconf.get('message').password;

		telegram.sendMessage(receiver, message, botname,
			function(err, result) {

				logger.debug('Error: ', err);
				logger.debug('Message:' , result);

				test.equal(err,null,'It should not have any error.');
				test.ok(result !== null, 'It should return success message!');

				test.done();
			});
	},

}
