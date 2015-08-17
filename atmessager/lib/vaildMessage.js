var logger = require('log4js').getLogger('vaildMessage');

var nconf = require('nconf');
nconf.file('bots', __dirname + '/../config/bots.json')
     .file('receviers', __dirname + '/../config/receivers.json')
     .file('senders', __dirname + '/../config/senders.json');

function vaildMessage(receiver,message,botname,sender,password){

  //If miss message, return error code 369

  if(message === undefined){

    return {error:369};
  }

  //If receiver not found, return error code 333

  if(nconf.get(receiver) === undefined){

    return {error:333};
  }

  //If sender not found, return error code 380

  if(nconf.get(sender) === undefined){

    return {error:380};
  }

  //If bot not found, return error code 360

  if(nconf.get(botname) === undefined){

    return {error:360};
  }

  //If password missmatch, return error code 361

  if(password !== nconf.get(sender).password1 &&
     password !== nconf.get(sender).password2){

    return {error:361};
  }

  //If there are not any error, return null error

  return {error:null};

}

module.exports = {
  'vaildMessage':vaildMessage
};
