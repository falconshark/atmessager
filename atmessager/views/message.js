var nconf = require('nconf');
var logger = require('log4js').getLogger('message');

var vaildMessage = require(__dirname + '/../lib/vaildMessage').vaildMessage;
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

  var vaildResult = vaildMessage(receiver, message, botname, sender, password);

  switch (vaildResult['error']) {

    //Bad Request: Wrong receiver name

    case 333:
      res.sendStatus(400);
      break;

      //Bad Request: Wrong bot name

    case 360:
      res.sendStatus(401);
      break;

      //Bad Request: Sender not found

    case 380:
      res.sendStatus(406);
      break;

      //Bad Request: Password not match

    case 361:
      res.sendStatus(402);
      break;

      //Bad Request: Missing message

    case 369:
      res.sendStatus(403);
      break;

    case null:

      telegram.sendMessage(receiver, message, botname,function(err,message){

        if(err){
            logger.error(err);
            res.sendStatus(407);
            return;
        }

        logger.info(message);

        res.sendStatus(201);
    });
  }
}

module.exports = {
  'healthCheck': healthCheck,
  'sendMessage': sendMessage
};
