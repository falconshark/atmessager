var request = require('request');
var promise = require('promised-io/promise');
var logger = require('log4js').getLogger('Unit-Test');
var nconf = require('nconf');
nconf.file('bots', __dirname + '/../config/bots.json')
     .file('receviers', __dirname + '/../config/receivers.json')
     .file('test', __dirname + '/../../test/config.json');

var healthCheck = function(req,res) {

    res.sendStatus(200);
    
};

function sendMessage(req,res){

  var receiver = req.body.receiver;
  var message = req.body.message;
  var botname = req.body.botname;
  var password = req.body.password;

  var vaildResult = vaildMessage(receiver,message,botname,password);

  if(vaildResult['error'] === 361){

    res.sendStatus(403);
  }

}

function vaildMessage(receiver,message,botname,password){

  if(message === undefined){

    return {error:361};
  }

}

module.exports = {
  'healthCheck':healthCheck,
  'sendMessage':sendMessage
};
