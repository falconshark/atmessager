var logger = require('log4js').getLogger('telegram');

var nconf = require('nconf');
nconf.file('bots', __dirname + '/../config/bots.json')
     .file('receviers', __dirname + '/../config/receivers.json')
     .file('senders', __dirname + '/../config/senders.json');

var request = require('request');

function sendMessage(receiver,message,botname,callback){

  var chat_id = nconf.get(receiver).chat_id;
  var token = nconf.get(botname).token;

  request.post({
      url:'https://api.telegram.org/bot' + token + '/sendMessage',
      form:{chat_id:chat_id,text:message}},
      function(err,res,body){

        if(err){
            logger.error(err);
            callback(err,null);
            return;
        }

        if(body['error_code']){

            logger.error(body['description']);

            err = {error:body['error_code'],description:body['description']};

            callback(err,null);

            return;
        }

        logger.info('Message sent!');

        var successMessage = {receiver:receiver,message:message,sendTime:new Date()};

        callback(null,successMessage);

    });
}

module.exports = {
  'sendMessage':sendMessage
};
