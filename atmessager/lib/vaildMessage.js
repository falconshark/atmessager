var nconf = require('nconf');
nconf.file('bots', __dirname + '/../config/bots.json')
     .file('receviers', __dirname + '/../config/receivers.json')
     .file('senders', __dirname + '/../config/senders.json');

function vaildMessage(receiver,message,botname,username,password){

  if(message === undefined){

    return {error:369};
  }

  if(nconf.get(receiver) === undefined){

    return {error:333};
  }

  if(nconf.get(botname) === undefined){

    return {error:360};
  }

  if(password !== nconf.get(username).password){

    return {error:361};
  }
}

module.exports = {
  'vaildMessage':vaildMessage
};
