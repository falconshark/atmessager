var request = require('request');
var promise = require('promised-io/promise');

var message = function(req,res) {

  var receiver = req.body.receiver;
  var message = req.body.message;
  var botname = req.body.botname;
  var password = req.body.password;

};

function sendMessage(receiver,message,botname,password){

}

module.exports = {
  'sendMessage':sendMessage
};
