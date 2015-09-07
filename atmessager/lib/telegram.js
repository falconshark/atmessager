var logger = require('log4js').getLogger('APP_LOG');
var request = require('request');

function sendMessage(config, receiver, message, botname, callback) {

	try {
		var chat_id = config.get(receiver).chat_id;
		var token = config.get(botname).token;
	} catch (ex) {

		err = {
			error: null,
			description: 'receiver or bot not found!'
		};

		logger.error(err);

		callback(err, null);

		return;
	}

	request.post({
			url: 'https://api.telegram.org/bot' + token + '/sendMessage',
			form: {
				chat_id: chat_id,
				text: message
			}
		},
		function(err, res, body) {

			body = JSON.parse(body);

			if (err) {
				logger.error(err);
				callback(err, null);
				return;
			}

			if (body['error_code']) {

				logger.error(body['description']);

				err = {
					error: body['error_code'],
					description: body['description']
				};

				callback(err, null);

				return;
			}

			logger.info('Message sent!');

			var successMessage = {
				receiver: receiver,
				botname: botname,
				message: message,
				sendTime: new Date()
			};

			callback(null, successMessage);

		});
}

module.exports = {
	'sendMessage': sendMessage
};
