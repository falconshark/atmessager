var logger = require('log4js').getLogger('verifiyMessage');
var nconf = require('nconf');
nconf.file('bots', __dirname + '/../config/bots.json')
	.file('receviers', __dirname + '/../config/receivers.json')
	.file('senders', __dirname + '/../config/senders.json');


function verifiyMessage(receiver, message, botname, sender, password) {

	//If miss message, return error message

	if (message === undefined || message === null) {

		return 'Bad Request: Missing message';
	}

	//If receiver not found, return error message

	if (nconf.get(receiver) === undefined) {

		return 'Bad Request: Wrong receiver name';
	}

	//If sender not found, return error message

	if (nconf.get(sender) === undefined) {

		return 'Bad Request: Sender not found';
	}

	//If bot not found, return error message

	if (nconf.get(botname) === undefined) {

		return 'Bad Request: Wrong bot name';
	}

	//If password missmatch, return error message

	if (password !== nconf.get(sender).password1 &&
		password !== nconf.get(sender).password2) {

		return 'Bad Request: Password not match';
	}

	//If there are not any error, return Success

	return 'Message verified';

}

module.exports = {
	'verifiyMessage': verifiyMessage
};
