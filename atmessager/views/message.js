var nconf = require('nconf');
var logger = require('log4js').getLogger('message');

var verifiyMessage = require(__dirname + '/../lib/verifiyMessage').verifiyMessage;
var telegram = require(__dirname + '/../lib/telegram');

var healthCheck = function(req, res) {

  res.status(200).send('All right.');
}

function sendMessage(req, res) {

  var receiver = req.body.receiver;
  var message = req.body.message;
  var botname = req.body.botname;
  var sender = req.body.sender;
  var password = req.body.password;

  var vaildResult = verifiyMessage(receiver, message, botname, sender, password);

  switch (vaildResult) {

    //Bad Request: Wrong receiver name

    case 'Bad Request: Wrong receiver name':
      res.status(400).send(vaildResult);
      break;

      //Bad Request: Wrong bot name

    case 'Bad Request: Wrong bot name':
      res.status(401).send(vaildResult);
      break;

      //Bad Request: Sender not found

    case 'Bad Request: Sender not found':
      res.status(406).send(vaildResult);
      break;

      //Bad Request: Password not match

    case 'Bad Request: Password not match':
      res.status(402).send(vaildResult);
      break;

      //Bad Request: Missing message

    case 'Bad Request: Missing message':
      res.status(403).send(vaildResult);
      break;

    case 'Message verified':

      telegram.sendMessage(receiver, message, botname,function(err,message){

        if(err){
            logger.error(err);
            res.status(407).send(JSON.stringify(err));
            return;
        }

        logger.info(message);

        res.status(201).send(JSON.stringify(message));
    });
  }
}

module.exports = {
  'healthCheck': healthCheck,
  'sendMessage': sendMessage
};
