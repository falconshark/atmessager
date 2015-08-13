var request = require('request');
var promise = require('promised-io/promise');
var logger = require('log4js').getLogger('Unit-Test');
var nconf = require('nconf');
nconf.file('bots', __dirname + '/../config/bots.json')
     .file('receviers', __dirname + '/../config/receivers.json');

var vaildMessage = require(__dirname + '/../lib/vaildMessage').vaildMessage;

var healthCheck = function(req,res) {

    res.sendStatus(200);
}

function sendMessage(req,res){

  var receiver = req.body.receiver;
  var message = req.body.message;
  var botname = req.body.botname;
  var username = req.body.username;
  var password = req.body.password;

  var vaildResult = vaildMessage(receiver,message,botname,username,password);

  switch (vaildResult['error']) {

    //Bad Request: Wrong receiver name

    case 333:
      res.sendStatus(400);
      break;

    //Bad Request: Wrong bot name

    case 360:
      res.sendStatus(401);
      break;

    //Bad Request: Password not match

    case 361:
      res.sendStatus(402);
      break;

    //Bad Request: Missing message

    case 369:
      res.sendStatus(403);
      break;
  }
}

module.exports = {
  'healthCheck':healthCheck,
  'sendMessage':sendMessage
};
