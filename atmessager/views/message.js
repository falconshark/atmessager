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

  switch (vaildResult['error']) {

    //Bad Request: Wrong receiver name

    case 333:
      res.status(400).send('Bad Request: Wrong receiver name');
      break;

      //Bad Request: Wrong bot name

    case 360:
      res.status(401).send('Bad Request: Wrong bot name');
      break;

      //Bad Request: Sender not found

    case 380:
      res.status(406).send('Bad Request: Sender not found');
      break;

      //Bad Request: Password not match

    case 361:
      res.status(402).send('Bad Request: Password not match');
      break;

      //Bad Request: Missing message

    case 369:
      res.status(403).send('Bad Request: Missing message');
      break;

    case null:

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
