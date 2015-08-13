var request = require('request');
var promise = require('promised-io/promise');
var logger = require('log4js').getLogger('Unit-Test');
var nconf = require('nconf');
nconf.file('bots', __dirname + '/../config/bots.json')
     .file('receviers', __dirname + '/../config/receivers.json')
     .file('senders', __dirname + '/../config/senders.json');

var vaildMessage = require(__dirname + '/../lib/vaildMessage').vaildMessage;

var healthCheck = function(req,res) {

    res.sendStatus(200);
}

function sendMessage(req,res){

  var receiver = req.body.receiver;
  var message = req.body.message;
  var botname = req.body.botname;
  var password = req.body.password;
  var testMode = req.body.testMode;

  var vaildResult = vaildMessage(receiver,message,botname,password,testMode);

  switch (vaildResult['error']) {

    case 333:
      res.sendStatus(400);
      break;

    case 360:
      res.sendStatus(401);
      break;

    case 361:
      res.sendStatus(402);
      break;

    case 369:
      res.sendStatus(403);
      break;
  }
}

module.exports = {
  'healthCheck':healthCheck,
  'sendMessage':sendMessage
};
